import { z } from "zod";

export const CDNLinkSchema = z.object({
  href: z.string().url(),
  /** "css" | "js" */
  type: z.enum(["css", "js"]),
  /** Optional: place in <head> instead of end of body */
  head: z.boolean().optional().default(false),
});

export const ColorSetSchema = z.object({
  primary: z.string().default("#0EA5E9"),
  secondary: z.string().default("#0891B2"),
  accent: z.string().default("#E11D48"),
  bg: z.string().default("#FFFFFF"),
  text: z.string().default("#1A1A2E"),
});

export const ThemeEffectsSchema = z.object({
  glitch: z.boolean().default(false),
  glowIntensity: z.enum(["low", "medium", "high"]).default("medium"),
});

export const ThemeSchema = z.object({
  mode: z.enum(["light", "dark", "auto"]).default("light"),
  light: ColorSetSchema.default({}),
  dark: ColorSetSchema.default({
    primary: "#A78BFA",
    secondary: "#22D3EE",
    accent: "#F472B6",
    bg: "#0A0A1A",
    text: "#E2E8F0",
  }),
  effects: ThemeEffectsSchema.default({}),
});

export const NavItemSchema: z.ZodType<{
  label: string;
  url?: string;
  icon?: string;
  children?: any[];
}> = z.object({
  label: z.string(),
  url: z.string().optional(),
  icon: z.string().optional(),
  children: z.array(z.lazy(() => NavItemSchema)).optional(),
});

export const SocialLinkSchema = z.object({
  name: z.string(),
  url: z.string(),
  icon: z.string(),
});

export const FontFamilySchema = z.object({
  body: z.string().default("LXGW WenKai"),
  heading: z.string().default("LXGW WenKai Medium"),
  bold: z.string().default("LXGW WenKai Medium"),
});

export const FontConfigSchema = z.object({
  family: FontFamilySchema.default({}),
  cdn: z.array(CDNLinkSchema).default([]),
});

export const HomepageSchema = z.object({
  hero: z.object({
    show: z.boolean().default(true),
    title: z.string().default("Welcome"),
    subtitle: z.string().default(""),
    background: z.string().default(""),
  }).default({}),
  postsPerPage: z.number().int().min(1).max(50).default(6),
  sidebar: z.object({
    categories: z.boolean().default(true),
    author: z.boolean().default(true),
    recentPosts: z.boolean().default(true),
    archives: z.boolean().default(true),
    siteInfo: z.boolean().default(true),
  }).default({}),
});

export const BlogSchema = z.object({
  postsPerPage: z.number().int().min(1).max(50).default(6),
  permalink: z.string().default("/posts/:slug"),
  excerpt: z.boolean().default(true),
  showUpdatedDate: z.boolean().default(true),
});

export const TwikooConfigSchema = z.object({
  envId: z.string(),
  region: z.string().optional().default(""),
});

export const ArtalkConfigSchema = z.object({
  server: z.string(),
  site: z.string(),
});

export const CommentsSchema = z.object({
  enabled: z.boolean().default(true),
  provider: z.enum(["twikoo", "artalk"]).default("twikoo"),
  twikoo: TwikooConfigSchema.optional(),
  artalk: ArtalkConfigSchema.optional(),
});

export const CDNOverridesSchema = z.object({
  twikoo: z.string().optional(),
  twikooCSS: z.string().optional(),
  artalk: z.string().optional(),
  artalkCSS: z.string().optional(),
});

export const GalleryItemSchema = z.object({
  title: z.string().default(""),
  alt: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  href: z.string().optional(),
  aspectRatio: z.number().positive().optional(),
  color: z.string().optional(),
});

export const GalleryGroupSchema = z.object({
  name: z.string(),
  slug: z.string().optional(),
  description: z.string().optional(),
  columns: z.number().int().min(1).max(6).optional(),
  items: z.array(GalleryItemSchema).default([]),
});

export const GallerySchema = z.object({
  columns: z.number().int().min(1).max(6).default(3),
  lightbox: z.boolean().default(true),
  groups: z.array(GalleryGroupSchema).default([]),
});

export const FriendLinkSchema = z.object({
  name: z.string(),
  url: z.string(),
  avatar: z.string().optional(),
  description: z.string().optional(),
  /** Override card accent color per link */
  color: z.string().optional(),
  /** Group label for categorization (e.g. "创作伙伴", "技术站点") */
  group: z.string().optional().default(""),
});

export const FooterSchema = z.object({
  /** Full footer content in markdown */
  content: z.string().default(""),
});

export const CodeBlockSchema = z.object({
  showLanguage: z.boolean().default(true),
  showLineNumbers: z.boolean().default(true),
  enableCopy: z.boolean().default(true),
  autoFoldThreshold: z.number().int().min(5).max(200).default(20),
  theme: z.string().default("github-dark"),
}).default({});

export const LightboxSchema = z.object({
  enabled: z.boolean().default(true),
  gallery: z.boolean().default(true),
  content: z.boolean().default(true),
}).default({});

export const LazyloadSchema = z.object({
  enabled: z.boolean().default(true),
}).default({});

export const RSSSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  copyright: z.string().optional(),
  itemsPerPage: z.number().int().min(1).max(100).default(20),
}).default({});

export const SiteConfigSchema = z.object({
  site: z.object({
    title: z.string().default("Furry CyberNest"),
    description: z.string().default(""),
    author: z.string().default(""),
    language: z.string().default("zh-CN"),
    url: z.string().default("https://example.com"),
  }),

  theme: ThemeSchema.default({}),

  fonts: FontConfigSchema.default({}),

  cdn: z
    .object({
      css: z.array(CDNLinkSchema).default([]),
      js: z.array(CDNLinkSchema).default([]),
    })
    .default({}),

  nav: z.array(NavItemSchema).default([
    { label: "首页", url: "/" },
    { label: "博客", url: "/blog" },
    { label: "画廊", url: "/gallery" },
    { label: "友链", url: "/friends" },
    { label: "关于", url: "/about" },
  ]),

  social: z.array(SocialLinkSchema).default([]),

  homepage: HomepageSchema.default({}),
  blog: BlogSchema.default({}),
  cdnOverrides: CDNOverridesSchema.optional(),

  friendLinks: z.array(FriendLinkSchema).default([]),
  comments: CommentsSchema.default({}),
  gallery: GallerySchema.default({}),
  codeBlock: CodeBlockSchema.default({}),
  lightbox: LightboxSchema.default({}),
  lazyload: LazyloadSchema.default({}),
  rss: RSSSchema.default({}),
  footer: FooterSchema.default({}),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type NavItem = z.infer<typeof NavItemSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type CDNLink = z.infer<typeof CDNLinkSchema>;
export type FriendLink = z.infer<typeof FriendLinkSchema>;
export type GalleryItem = z.infer<typeof GalleryItemSchema>;
export type GalleryGroup = z.infer<typeof GalleryGroupSchema>;
