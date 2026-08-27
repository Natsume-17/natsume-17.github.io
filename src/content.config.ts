import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    githubUrl: z.string().url(),
    demoUrl: z.string().url().optional(),
  }),
});

const techCategoriesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/tech-categories" }),
  schema: z.object({
    title: z.string(),
    items: z.array(
      z.object({
        name: z.string(),
        viewBox: z.string(),
        icon: z.string(),
      }),
    ),
  }),
});

export const collections = {
  projects: projectsCollection,
  techCategories: techCategoriesCollection,
};
