import { defineConfig } from "./src/config";

export default defineConfig({
  site: {
    title: "Furry CyberNest",
    description: "一个赛博世界的兽设故事站",
    author: "YourName",
    language: "zh-CN",
    url: "https://example.com",
  },

  fonts: {
    family: {
      body: "LXGW WenKai",
      heading: "LXGW WenKai Medium",
    },
    cdn: [
      {
        href: "https://cdn.245179.xyz/LXGWWenKai-Medium/result.css",
        type: "css",
        head: true,
      },
      {
        href: "https://cdn.245179.xyz/LXGWWenKai-Regular/result.css",
        type: "css",
        head: true,
      },
    ],
  },

  cdn: {
    css: [],
    js: [],
  },

  theme: {
    mode: "light",
    light: {
      primary: "#0EA5E9",
      secondary: "#0891B2",
      accent: "#E11D48",
      bg: "#FFFFFF",
      text: "#1A1A2E",
    },
    dark: {
      primary: "#38BDF8",
      secondary: "#22D3EE",
      accent: "#F472B6",
      bg: "#0A0A1A",
      text: "#E2E8F0",
    },
    effects: {
      scanlines: true,
      glitch: false,
      glowIntensity: "medium",
    },
  },

  nav: [
    { label: "首页", url: "/" },
    {
      label: "博文",
      children: [
        { label: "全部文章", url: "/blog" },
        { label: "分类", url: "/blog/categories" },
        { label: "归档", url: "/archive" },
      ],
    },
    { label: "小说", url: "/novels" },
    { label: "画廊", url: "/gallery" },
    {
      label: "更多",
      children: [
        { label: "友链", url: "/friends" },
        { label: "关于", url: "/about" },
        { label: "联系", url: "/contact" },
      ],
    },
  ],

  social: [
    { name: "GitHub", url: "https://github.com/yourname", icon: "github" },
    { name: "Twitter", url: "https://twitter.com/yourname", icon: "twitter" },
    { name: "微博", url: "https://weibo.com/yourname", icon: "weibo" },
    { name: "B站", url: "https://space.bilibili.com/yourid", icon: "bilibili" },
    { name: "Pixiv", url: "https://pixiv.net/users/yourid", icon: "pencil" },
  ],

  homepage: {
    hero: {
      title: "欢迎来到 Furry CyberNest",
      subtitle: "赛博森林深处，故事正在低语",
      backgroundEffect: "particles",
    },
    featuredPosts: 3,
    showCharacterSpotlight: true,
  },

  blog: {
    postsPerPage: 6,
    permalink: "/blog/:slug",
    excerpt: true,
  },

  comments: {
    enabled: true,
    provider: "twikoo",
    twikoo: {
      envId: "https://your-twikoo.vercel.app",
      region: "",
    },
    artalk: {
      server: "https://artalk.example.com",
      site: "Furry CyberNest",
    },
  },

  friendLinks: [
    {
      name: "Astro",
      url: "https://astro.build",
      description: "构建更快网站的 Web 框架",
      color: "#BC52EE",
      group: "技术伙伴",
    },
    {
      name: "Tailwind CSS",
      url: "https://tailwindcss.com",
      description: "实用优先的 CSS 框架",
      color: "#06B6D4",
      group: "技术伙伴",
    },
    {
      name: "Furry 示例站",
      url: "https://example.com",
      description: "一个 furry 站点示例",
      color: "#F472B6",
      group: "创作伙伴",
    },
  ],

  gallery: {
    columns: 3,
    lightbox: true,
  },

  rss: {
    copyright: "© 2026 Furry CyberNest",
    itemsPerPage: 20,
  },

  footer: {
    content: [
      '用 [Astro](https://astro.build) 构建 · 主题 [Furry CyberNest](/)',
      '',
      '赛博森林深处，故事正在低语',
      '',
      '© 2026 Furry CyberNest',
    ].join("\n"),
  },
});
