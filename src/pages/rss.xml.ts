import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import config from "virtual:site-config";

function postSlug(post: { data: { abbrlink?: string }; slug: string }) {
  return post.data.abbrlink || post.slug;
}

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  const items = posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, config.rss.itemsPerPage);

  return rss({
    title: config.rss.title || config.site.title,
    description: config.rss.description || config.site.description,
    site: context.site || config.site.url,
    items: items.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${postSlug(post)}/`,
      categories: post.data.tags,
    })),
    customData: config.rss.copyright ? `<copyright>${config.rss.copyright}</copyright>` : "",
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
  });
}
