import { getCollection } from "astro:content";
import { marked } from "marked";
import type { APIContext } from "astro";
import config from "virtual:site-config";

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function postSlug(post: { data: { abbrlink?: string }; slug: string }) {
  return post.data.abbrlink || post.slug;
}

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  const items = posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, config.rss.itemsPerPage);

  const siteUrl = context.site || new URL(config.site.url);
  const site = siteUrl.href.replace(/\/$/, "");
  const feedUrl = `${site}/atom.xml`;
  const updated = items.length > 0 ? items[0].data.pubDate.toISOString() : new Date().toISOString();

  const entries = await Promise.all(
    items.map(async (post) => {
      const link = `${site}/blog/${postSlug(post)}/`;
      const html = await marked.parse(post.body || "");
      const categories = post.data.tags
        .map((t) => `      <category term="${escapeXml(t)}" />`)
        .join("\n");

      return `    <entry>
      <title>${escapeXml(post.data.title)}</title>
      <link href="${escapeXml(link)}" />
      <id>${escapeXml(link)}</id>
      <published>${post.data.pubDate.toISOString()}</published>
      <updated>${post.data.pubDate.toISOString()}</updated>
      <summary>${escapeXml(post.data.description)}</summary>
      <content type="html"><![CDATA[${html}]]></content>
${categories}
    </entry>`;
    })
  );

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(config.rss.title || config.site.title)}</title>
  <subtitle>${escapeXml(config.rss.description || config.site.description)}</subtitle>
  <link href="${escapeXml(feedUrl)}" rel="self" />
  <link href="${escapeXml(site)}/" rel="alternate" />
  <id>${escapeXml(site)}/</id>
  <updated>${updated}</updated>
  <author>
    <name>${escapeXml(config.site.author)}</name>
  </author>
${entries.join("\n")}
</feed>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}
