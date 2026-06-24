import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import remarkDirective from "remark-directive";
import icon from "astro-icon";
import siteConfig from "./site.config.ts";
import { virtualConfigPlugin } from "./plugins/virtual-config";
import { remarkStellarInline } from "./src/remark-plugins/inline";
import { remarkStellarContainers } from "./src/remark-plugins/containers";
import { remarkStellarLeaf } from "./src/remark-plugins/leaf";

export default defineConfig({
  site: "https://example.com",
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss(), virtualConfigPlugin()],
  },
  markdown: {
    shikiConfig: {
      theme: siteConfig.codeBlock?.theme || "github-dark",
      wrap: false,
    },
    remarkPlugins: [remarkDirective, remarkStellarInline, remarkStellarContainers, remarkStellarLeaf],
    smartypants: false,
  },
});
