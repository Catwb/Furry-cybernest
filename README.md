# Furry CyberNest

赛博风格的 furry 主题博客/小说站，基于 [Astro](https://astro.build) 构建。

## 功能

### 核心
- **配置驱动** — 所有设置集中在 `site.config.ts`，Zod 校验+类型安全
- **响应式** — 桌面悬浮药丸导航 + 手机汉堡菜单抽屉
- **赛博视觉** — 霓虹光效、网格背景、可配置主题色

### 内容
- **博客** — Content Collections 驱动，支持封面图、分页、归档（年/月时间线）
- **分类** — 多级分类（如 `["小说", "赛博世界"]`），分类树展示
- **小说** — 双集合（novels + chapters），章节目录、上下章导航、连载/完结状态
- **画廊** — 可配置列数、分组、图片信息、灯箱展示
- **友链** — 分组展示，可折叠，每链接可设独立色/头像
- **评论** — Twikoo / Artalk 二选一，CDN 可覆盖

### 增强功能
- **PJAX 无刷新导航** — 拦截内部链接，fetch + 替换 `<main>` 内容，保留头部/导航/背景，fallback 到全页刷新
- **代码块美化** — 语言标签、行号、一键复制、超长自动折叠（`>20行`），支持配置开关
- **灯箱** — 点击文章正文图片 / 画廊图片可全屏放大查看，键盘 `Esc` 关闭
- **图片懒加载** — 原生 `loading="lazy"` 减少带宽浪费
- **滚动动画** — IntersectionObserver 驱动的入场动画

### 页面路由

| 路由 | 说明 |
|------|------|
| `/` | 首页（Hero + 博客列表 + 分页 + 侧边栏） |
| `/page/:page` | 首页分页（第 2、3、4… 页） |
| `/posts/[...slug]` | 文章详情（支持 `abbrlink` 自定义路径） |
| `/blog/categories` | 分类总览（树形展示） |
| `/blog/categories/:category+` | 分类下的文章列表（支持多级） |
| `/novels` | 小说列表 |
| `/novels/:slug` | 小说详情 + 章节目录 |
| `/novels/:slug/:chapter` | 章节阅读 |
| `/archive` | 文章归档 |
| `/about` | 关于 |
| `/friends` | 友链 |
| `/gallery` | 画廊 |
| `/rss.xml` | RSS 2.0 |
| `/atom.xml` | Atom 1.0 |

### Markdown 扩展

内置类 Stellar 标签插件，支持：
- **行内**：高亮 `:mark[]`、模糊 `:blur[]`、密码 `:psw[]`、下划线、波浪线、删除线、上标、下标、标签 `:hashtag[]` 等
- **容器**：备注 `:::note`、折叠 `:::folding`、诗歌 `:::poetry`、时间线 `:::timeline`、网格 `:::grid` 等
- **块级**：按钮 `::button[]`、链接卡 `::link[]`、视频 `::video{}`、音频 `::audio{}`、GitHub 卡片 `::ghcard{}` 等

## 快速开始

```bash
pnpm install
pnpm dev       # 开发
pnpm build     # 构建到 dist/
pnpm preview   # 预览构建结果
```

> **⚠️ Astro v5 持久缓存** — 修改 `remark-plugins/` 等构建相关代码后，需删除 `.astro/data-store.json` 再重启 dev server，否则 Astro 会直接使用缓存的 HTML：
> ```bash
> Remove-Item -Force .astro/data-store.json; pnpm dev
> ```

## 配置

编辑 `site.config.ts` 即可自定义所有内容。结构概览：

| 字段 | 说明 |
|------|------|
| `site` | 站点元信息（标题、描述、作者、语言、URL） |
| `theme` | 亮/暗色配色 + 效果开关 |
| `cdn` | 字体/CSS/JS 外部资源 |
| `nav` | 导航栏（支持多级嵌套） |
| `social` | 社交链接（github/twitter/weibo/bilibili/pixiv） |
| `homepage` | 首页配置（Hero、每页文章数、侧边栏组件） |
| `blog` | 每页文章数、永久链接格式 |
| `novels` | 小说默认设置 |
| `comments` | 评论系统（twikoo/artalk）|
| `friendLinks` | 友链列表（支持分组） |
| `codeBlock` | 代码块：语言标签/行号/复制/折叠阈值/主题 |
| `lightbox` | 灯箱总开关 + 正文/画廊独立开关 |
| `lazyload` | 图片懒加载开关 |
| `gallery` | 画廊列数、灯箱、分组展示 |
| `footer` | 页脚 Markdown 内容 |
| `rss` | RSS feed 配置 |
| `cdnOverrides` | CDN 地址覆盖 |

### 首页配置

```ts
homepage: {
  hero: {
    show: true,                    // 是否显示 Hero 区块
    title: "欢迎来到 Furry CyberNest",
    subtitle: "赛博森林深处，故事正在低语",
    background: "https://...",     // 背景图 URL，"none" 隐藏
  },
  postsPerPage: 6,                 // 每页展示文章数
  sidebar: {
    characterSpotlight: true,      // 角色 Spotlight 卡片
    categories: true,              // 分类列表
  },
}
```

背景图设为全站固定背景（`position: fixed`），所有页面可见。暗色模式下自动降低亮度（`brightness(0.35) saturate(0.6)`）。内容区域使用卡片底色（`--color-card`）覆盖，保证文字可读性。

### 代码块配置

```ts
codeBlock: {
  showLanguage: true,      // 显示语言标签
  showLineNumbers: true,   // 显示行号
  enableCopy: true,        // 显示复制按钮
  autoFoldThreshold: 20,   // 超过指定行数自动折叠
  theme: "github-dark",    // Astro Shiki 主题
}
```

### 画廊配置

```ts
gallery: {
  columns: 3,              // 默认列数，每个分组可覆盖
  lightbox: true,
  groups: [
    {
      name: "角色立绘",
      slug: "characters",  // 用于标题锚点，可选
      description: "角色设定、头像与完整立绘。",
      columns: 3,
      items: [
        {
          title: "银狐·赛博形态",
          alt: "银狐赛博角色立绘",
          description: "可选说明文字",
          image: "/images/gallery/fox.jpg",
          href: "/blog/character-fox",
          aspectRatio: 3 / 4,
          color: "#0ea5e9", // 未设置 image 时生成占位图
        },
      ],
    },
  ],
}
```

## 内容管理

### 博客文章
`src/content/blog/` 下新建 `.md` 文件：

```yaml
---
title: "标题"
description: "摘要"
pubDate: 2026-06-24
abbrlink: "custom-slug"      # 可选，自定义 URL 路径（默认用文件名）
cover: "/images/cover.jpg"   # 可选
categories:
  - 小说                     # 多级分类：["父分类", "子分类"]
  - 赛博世界
draft: false
---
正文 Markdown...
```

### 分类

分类支持多级结构，使用 `categories` 数组定义：

```yaml
categories:
  - 小说          # 第一级
  - 赛博世界      # 第二级（可选）
```

- `/blog/categories` — 分类总览页，树形展示所有分类
- `/blog/categories/小说` — 该分类下的所有文章
- `/blog/categories/小说/赛博世界` — 该子分类下的文章

### 小说
```bash
# 1. 在 src/content/novels/ 新建小说元数据
# 2. 在 src/content/chapters/ 按 {slug}__{编号}.md 命名分章
```

章节 frontmatter：
```yaml
---
title: "章节标题"
novel: "novel-slug"   # 关联的小说 slug
chapter: 1
pubDate: 2026-06-24
draft: false
---
```

## 项目结构

```
src/
  content.config.ts           # Content Collections 定义
  config/schema.ts            # Zod 校验配置
  layouts/BaseLayout.astro    # 全局壳（导航、主题、PJAX、侧栏、页脚）
  components/
    NavMenu.astro             # 递归多级导航
    Sidebar.astro             # 首页侧边栏（作者卡片、最新文章、分类、归档）
    comments/                 # Twikoo（含 CSS 自定义 + darkMode 同步）
  pages/                      # 路由页面
  content/                    # 内容源文件
  styles/globals.css          # 全局样式 + Tailwind v4 主题
  remark-plugins/             # Markdown 扩展插件（Stellar 风格标签）
public/scripts/features.js    # 代码块增强、灯箱（支持 PJAX 后重初始化）
plugins/virtual-config.ts     # Vite 插件暴露配置到虚拟模块
```
