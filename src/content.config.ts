import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    githubUrl: z.string().url(),
    demoUrl: z.string().url().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
