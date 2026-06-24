import path from "node:path";
import { readFileSync } from "node:fs";
import type { Plugin, ResolvedConfig } from "vite";

const VIRTUAL_MODULE_ID = "virtual:site-config";
const RESOLVED_ID = "\0" + VIRTUAL_MODULE_ID;

export function virtualConfigPlugin(): Plugin {
  let cfg: ResolvedConfig;

  return {
    name: "virtual-config",
    enforce: "pre",

    configResolved(c) {
      cfg = c;
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_ID;
      return undefined;
    },

    load(id) {
      if (id !== RESOLVED_ID) return undefined;
      const root = cfg?.root || process.cwd();
      const configPath = path.resolve(root, "site.config.ts");

      try {
        const raw = readFileSync(configPath, "utf-8");
        const body = raw
          .replace(/^import\s+.*?from\s+["'].*?["'];?\s*\n*/m, "")
          .replace(/[\s\S]*?export\s+default\s+(?:defineConfig\s*\()?/, "")
          .replace(/\)\s*;?\s*$/, "")
          .trim();

        return {
          code: [
            `import { SiteConfigSchema } from "/src/config/schema";`,
            `const _raw = ${body};`,
            `const _parsed = SiteConfigSchema.safeParse(_raw);`,
            `if (!_parsed.success) {`,
            `  const e = _parsed.error.flatten();`,
            `  console.error("[site.config.ts] Validation errors:", JSON.stringify(e, null, 2));`,
            `  throw new Error("site.config.ts validation failed");`,
            `}`,
            `const config = _parsed.data;`,
            `export default config;`,
            `export const siteConfig = config;`,
            `export const { site, fonts, cdn, theme, nav, social, homepage, blog, comments, gallery, footer, cdnOverrides, friendLinks } = config;`,
          ].join("\n"),
          map: null,
        };
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        this.error(`Failed to load site.config.ts: ${msg}`);
        return null;
      }
    },
  };
}
