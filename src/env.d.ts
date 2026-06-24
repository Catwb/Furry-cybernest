/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "virtual:site-config" {
  import type { SiteConfig } from "./config/schema";
  const config: SiteConfig;
  export default config;
  export const siteConfig: SiteConfig;
  export const site: SiteConfig["site"];
  export const fonts: SiteConfig["fonts"];
  export const cdn: SiteConfig["cdn"];
  export const theme: SiteConfig["theme"];
  export const nav: SiteConfig["nav"];
  export const social: SiteConfig["social"];
  export const homepage: SiteConfig["homepage"];
  export const blog: SiteConfig["blog"];
  export const comments: SiteConfig["comments"];
  export const gallery: SiteConfig["gallery"];
  export const footer: SiteConfig["footer"];
  export const cdnOverrides: SiteConfig["cdnOverrides"];
  export const friendLinks: SiteConfig["friendLinks"];
}

// CDN-loaded globals
declare var twikoo: {
  init: (opts: { envId: string; region: string }) => void;
};

declare class Artalk {
  constructor(opts: {
    el: string;
    server: string;
    site: string;
    pageKey: string;
    pageTitle: string;
  });
}
