/* ============================================
   DATOS DE PROYECTOS
   Añadir un proyecto nuevo = añadir un objeto
   a este array. No se toca el HTML.
   ============================================ */

export const projects = [
  {
    title: "Tetris",
    description:
      "Recreación del clásico Tetris, con lógica de colisiones, rotación de piezas y sistema de puntuación implementados desde cero con HTML5, CSS3, JavaScript y Canvas API.",
    image: "assets/images/tetris-menu.png",
    tags: ["HTML5", "CSS3", "JavaScript", "Canvas API"],
    githubUrl: "https://github.com/natsume-17/tetris-web/",
    demoUrl: "https://natsume-17.github.io/tetris-web", // null si no hay demo en línea; se omite el enlace automáticamente
  },
  // siguiente proyecto: copiar bloque y rellenar los campos
];
