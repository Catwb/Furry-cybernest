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
      glitch: false,
      glowIntensity: "medium",
    },
  },

  nav: [
    { label: "首页", url: "/" },
    {
      label: "博文",
      children: [
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
      show: true,
      title: "欢迎来到 Furry CyberNest",
      subtitle: "赛博森林深处，故事正在低语",
      background: "https://api.furry.ist/furry-img/?mode=auto",
    },
    postsPerPage: 6,
    sidebar: {
      categories: true,
      author: true,
      recentPosts: true,
      archives: true,
      siteInfo: true,
    },
  },

  blog: {
    postsPerPage: 6,
    permalink: "/posts/:slug",
    excerpt: true,
    showUpdatedDate: false,
  },

  comments: {
    enabled: true,
    provider: "twikoo",
    twikoo: {
      envId: "https://twikoo.245179.xyz/.netlify/functions/twikoo",
      region: "",
    },
    artalk: {
      server: "https://artalk.example.com",
      site: "Furry CyberNest",
    },
  },

  cdnOverrides: {
    twikoo: "https://unpkg.com/twikoo@1.7.12/dist/twikoo.all.min.js",
    twikooCSS: "https://cdn.245179.xyz/css/twikoo.css",
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

  codeBlock: {
    showLanguage: true,
    showLineNumbers: true,
    enableCopy: true,
    autoFoldThreshold: 20,
    theme: "github-dark",
  },

  lightbox: {
    enabled: true,
    gallery: true,
    content: true,
  },

  lazyload: {
    enabled: true,
  },

  gallery: {
    columns: 3,
    lightbox: true,
    groups: [
      {
        name: "角色立绘",
        slug: "characters",
        description: "角色设定、头像与完整立绘。",
        columns: 3,
        items: [
          { title: "银狐·赛博形态", alt: "银狐赛博角色立绘", color: "#0ea5e9", aspectRatio: 3 / 4 },
          { title: "赤狼·火焰纹章", alt: "赤狼角色设定图", color: "#e11d48", aspectRatio: 4 / 3 },
          { title: "玄猫·暗影漫步", alt: "玄猫角色头像", color: "#0ea5e9", aspectRatio: 1 },
        ],
      },
      {
        name: "场景插画",
        slug: "scenes",
        description: "故事场景、世界观氛围和背景概念图。",
        columns: 2,
        items: [
          { title: "赛博森林", alt: "霓虹光线中的赛博森林", color: "#0891b2", aspectRatio: 16 / 9 },
          { title: "霓虹夜市", alt: "兽人聚集的霓虹夜市", color: "#f59e0b", aspectRatio: 4 / 3 },
          { title: "数据海", alt: "由光点组成的数据海", color: "#22c55e", aspectRatio: 3 / 4 },
        ],
      },
    ],
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
