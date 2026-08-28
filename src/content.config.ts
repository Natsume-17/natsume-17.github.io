/* ============================================
   CONFIGURACIÓN DE CONTENT COLLECTIONS
   Define el esquema de datos para cada colección
   de contenido del portafolio (proyectos y
   categorías de tecnologías), usando el loader
   glob() para leer archivos JSON del filesystem.
   ============================================ */

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Colección de proyectos: cada archivo .json en
// src/content/projects representa un proyecto del portafolio.
const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    githubUrl: z.string().url(),
    demoUrl: z.string().url().optional(), // puede que un proyecto no tenga demo, así que es opcional
  }),
});

// Colección de categorías de tecnologías: cada archivo .json en
// src/content/tech-categories agrupa varias tecnologías (items)
// bajo un mismo título (ej. «Frontend», «Backend / Programación»).
const techCategoriesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/tech-categories" }),
  schema: z.object({
    title: z.string(),
    items: z.array(
      z.object({
        name: z.string(), // nombre visible de la tecnología (ej. «JavaScript»)
        viewBox: z.string(), // atributo viewBox del SVG del icono
        icon: z.string(), // contenido interno del SVG (el <path>), copiado de Simple Icons
      }),
    ),
  }),
});

// Registro de colecciones disponibles para getCollection().
export const collections = {
  projects: projectsCollection,
  techCategories: techCategoriesCollection,
};
