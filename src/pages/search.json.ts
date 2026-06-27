import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).filter((p) => !p.data.draft);
  const chapters = (await getCollection("chapters")).filter((c) => !c.data.draft);

  const index: Array<{
    title: string;
    description: string;
    url: string;
    type: string;
  }> = [
    ...posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      url: `/posts/${p.data.abbrlink || p.slug}`,
      type: "文章",
    })),
    ...chapters.map((c) => ({
      title: c.data.title,
      description: `第 ${c.data.chapter} 章`,
      url: `/novels/${c.data.novel}/${c.data.chapter}`,
      type: "章节",
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  });
};
