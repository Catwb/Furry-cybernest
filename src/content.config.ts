import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    pubDate: z.date(),
    abbrlink: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const page = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
  }),
});

const novels = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string().default(""),
    description: z.string().default(""),
    cover: z.string().optional(),
    status: z.enum(["ongoing", "completed", "hiatus"]).default("ongoing"),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const chapters = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    novel: z.string(),
    chapter: z.number(),
    volume: z.number().optional(),
    pubDate: z.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, page, novels, chapters };
