import type { SiteConfig } from "./schema";

/** Helper to define config with full type inference */
export function defineConfig(config: SiteConfig): SiteConfig {
  return config;
}

export type { SiteConfig } from "./schema";
