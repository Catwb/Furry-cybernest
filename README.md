# Furry CyberNest

赛博风格的 furry 主题博客/小说站，基于 [Astro](https://astro.build) 构建。

## 功能

### 核心
- **配置驱动** — 所有设置集中在 `site.config.ts`，Zod 校验+类型安全
- **亮色/暗色/自动** 三种主题模式，CSS 变量实时切换，localStorage 持久化
- **响应式** — 桌面悬浮药丸导航 + 手机汉堡菜单抽屉
- **赛博视觉** — 扫描线、霓虹光效、网格背景

### 内容
- **博客** — Content Collections 驱动，支持标签、封面图、分页、归档（年/月时间线）
- **小说** — 双集合（novels + chapters），章节目录、上下章导航、连载/完结状态
- **画廊** — 可配置列数的网格布局
- **友链** — 分组展示，可折叠，每链接可设独立色/头像
- **评论** — Twikoo / Artalk 二选一，CDN 可覆盖

### 页面路由

| 路由 | 说明 |
|------|------|
| `/` | 首页（Hero + 精选文章 + 角色卡片） |
| `/blog` | 博客列表 |
| `/blog/:slug` | 文章详情（支持 frontmatter `abbrlink` 自定义路径） |
| `/novels` | 小说列表 |
| `/novels/:slug` | 小说详情 + 章节目录 |
| `/novels/:slug/:chapter` | 章节阅读 |
| `/archive` | 文章归档 |
| `/about` | 关于 |
| `/friends` | 友链 |
| `/contact` | 联系 |
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
| `homepage` | 首页 Hero、精选文章数、角色卡片 |
| `blog` | 每页文章数、永久链接格式 |
| `novels` | 小说默认设置 |
| `comments` | 评论系统（twikoo/artalk）|
| `friendLinks` | 友链列表（支持分组） |
| `gallery` | 画廊列数、灯箱 |
| `footer` | 页脚 Markdown 内容 |
| `rss` | RSS feed 配置 |
| `cdnOverrides` | CDN 地址覆盖 |

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
tags: ["标签1", "标签2"]
draft: false
---
正文 Markdown...
```

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
  content.config.ts      # Content Collections 定义
  config/schema.ts       # Zod 校验配置
  layouts/BaseLayout.astro   # 全局壳（导航、主题、页脚）
  components/
    NavMenu.astro        # 递归多级导航
    SocialIcon.astro     # SVG 社交图标
    comments/            # Twikoo & Artalk
  pages/                 # 路由页面
  content/               # 内容源文件
  styles/globals.css     # 全局样式 + Tailwind 主题
  remark-plugins/        # Markdown 扩展插件
plugins/virtual-config.ts   # Vite 插件暴露配置到虚拟模块
```
