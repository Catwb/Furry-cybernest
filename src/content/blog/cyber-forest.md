---
title: "赛博森林的银狐 — 主题功能完全展示"
description: "展示 Furry CyberNest 主题所有功能：Markdown 扩展、排版样式、交互组件等"
pubDate: 2026-06-24
updatedDate: 2026-06-29
abbrlink: "cyber-forest"
cover: "https://picsum.photos/seed/cyber/1200/630"
categories:
  - 小说
  - 赛博世界
draft: false
---

> 在霓虹闪烁的赛博森林深处，一只银狐苏醒于数据洪流之中。
> 她的皮毛闪烁着微弱的蓝光，那是被数字化改造后留下的痕迹。

## 行内样式

本主题支持丰富的行内排版标签：

- :u[下划线文字]
- :emp[强调文字]
- :wavy[波浪线]
- :del[删除线]
- :kbd[Ctrl+S]
- :psw[隐藏密码] — 悬停显示
- :blur[模糊内容] — 悬停显示
- H:sub[2]O — 下标
- E=mc:sup[2] — 上标
- :mark[高亮重点] — 高亮标记
- :hashtag[赛博世界]{href="/blog/categories/小说/赛博世界"}

## 引用块

> 普通引用块。
>
> 多段落在引用块中自动换行。

:::blockquote
扩展引用块，支持更丰富的内部排版。
可以包含 :mark[高亮] 等行内标签。
:::

## 代码块

语法高亮，支持语言标签、行号和复制按钮：

```typescript
// Zod 校验配置
import { z } from "astro/zod";

export const SiteConfigSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  language: z.string().default("zh-CN"),
  url: z.string().url(),
});
```

```css
/* 赛博霓虹按钮 */
.neon-btn {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border: none;
  color: #fff;
  padding: 0.5em 1.5em;
  border-radius: 8px;
  transition: all 0.3s ease;
}
```

## 图片与灯箱

点击图片可放大查看：

::image{src="https://picsum.photos/seed/forest1/800/400" alt="赛博森林全景" ratio="2/1" fancybox="cyber"}

::image{src="https://picsum.photos/seed/forest2/800/400" alt="数据塔" ratio="2/1" fancybox="cyber"}

## 容器标签

### 备注框

:::note{title="世界设定"}
赛博森林是一个由数据构成的数字世界。
每一棵树都是一台服务器，每一片叶子都是一段代码。
:::

:::box{title="提示"}
`:box` 是 `:note` 的别名，两者完全一致。
:::

### 折叠面板

:::folding{title="关于银狐种族"}
银狐是赛博世界中最为神秘的种族之一，
她们的皮毛散发着微弱的蓝光，能够与数据流直接交互。
:::

:::folding{title="赛博森林层级结构"}
- **表层森林** — 公共数据区域，所有赛博兽均可自由访问
- **中层树冠** — 加密协议层，需要权限令牌才能进入
- **深层根域** — 核心数据区，传说中埋藏着创世代码的碎片
:::

### 引用框

:::quot
「每一条数据河流都有它的源头，每一个赛博兽都有它的过去。」
:::

### 诗歌排版

:::poetry
# .title
数据森林的银狐之歌
# .meta
赛博民谣 | 2077
# .body
霓虹灯下银影闪
数据洪流不夜天
代码为叶脉作根
赛博深处有人家
# .footer
—— 选自《赛博诗集》
:::

### 时间线

拂晓的旅程时间线：

- **2077-03** — 拂晓在赛博森林的表层苏醒
- **2077-04** — 获得第一块数据碎片，解锁中层权限
- **2077-06** — 结识数据游侠「赤狐·烈风」
- **2077-09** — 深入中层树冠，发现远古协议遗迹

### 网格布局

赛博森林的数据节点分布：

- **数据节点 α** — 位于森林东翼，存储着 404 号协议的历史日志
- **数据节点 β** — 位于森林西翼，包含加密的通讯记录
- **数据节点 γ** — 深层区域的入口，需要三把令牌密钥
- **数据节点 δ** — 核心数据区的守护节点

## 按钮

::button{url="/blog" text="浏览全部文章"}

::button{url="/about" text="关于本站" size="xs"}

## 链接卡片

::link{url="https://github.com" title="GitHub" desc="true" icon="https://github.githubassets.com/favicons/favicon.svg"}

::link{url="https://astro.build" title="Astro 框架"}

## 复制组件

::copy{text="pnpm install furry-cybernest" prefix="$"}

## 复选框

::checkbox{text="编写第一篇文章"}
::checkbox{checked text="配置站点信息"}
::checkbox{checked text="部署到服务器"}

## 导航栏

::navbar{links="[首页](/) [归档](/archive) [分类](/blog/categories) [关于](/about)" active="/archive"}

---

**赛博森林的故事才刚刚开始。** 更多精彩内容，请继续探索本站。
