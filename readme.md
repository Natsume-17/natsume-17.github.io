# natsume-17.github.io

Portafolio personal — desarrollador web júnior. Landing page, presentación de proyectos y contacto, desplegado con GitHub Pages.

🔗 **Demo en vivo:** [natsume-17.github.io](https://natsume-17.github.io)

## Stack

- **[Astro](https://astro.build)** — generador de sitios estáticos, con Content Collections para gestionar proyectos y tecnologías
- **TypeScript** — esquemas de validación (Zod) para el contenido
- **HTML5** semántico
- **CSS3** — variables nativas (custom properties), grid y flexbox, diseño adaptable
- **JavaScript (ES6+)** — módulos nativos, sin frameworks ni bundler
- **Three.js** — fondo animado de partículas con efecto parallax

## Estructura del proyecto

```
├── src/
│ ├── content.config.ts # esquemas (Zod) de las Content Collections
│ ├── content/
│ │ ├── projects/ # un .json por proyecto
│ │ └── tech-categories/ # un .json por categoría de tecnologías
│ ├── data/
│ │ └── soft-skills.json # lista de habilidades blandas
│ ├── components/
│ │ └── ExternalLinkIcon.astro
│ └── pages/
│ └── index.astro # página principal
├── public/
│ ├── css/
│ │ ├── reset.css # normaliza estilos del navegador
│ │ ├── variables.css # paleta de colores, tipografía, espaciados
│ │ ├── main.css # layout general y estructura de la página
│ │ └── components.css # piezas reutilizables (botones, tarjetas, badges)
│ ├── js/
│ │ ├── main.js # punto de entrada
│ │ ├── three-background.js # escena Three.js (partículas + parallax)
│ │ ├── nav-spy.js # resalta la sección activa en el nav al hacer scroll
│ │ └── reveal.js # animaciones de entrada (fade-in + slide-up)
│ ├── assets/
│ │ ├── images/
│ │ └── icons/
│ └── robots.txt
└── astro.config.mjs
```

## Características

- Diseño oscuro con acentos ámbar, estética minimalista-futurista.
- Fondo 3D de partículas conectadas (estilo constelación) que reacciona al ratón.
- Proyectos y tecnologías gestionados con **Content Collections de Astro**: añadir contenido nuevo es crear un archivo `.json`, sin tocar `index.astro`.
- Scroll spy: resalta en el nav la sección visible.
- Animaciones de entrada al hacer scroll, con `IntersectionObserver`.
- Accesible: navegación por teclado con foco visible, contraste WCAG AA, `prefers-reduced-motion` respetado también en la animación 3D.
- SEO básico: meta tags Open Graph/Twitter Card, `robots.txt`.
- Optimizado para rendimiento: lazy-loading de imágenes, partículas limitadas, sin dependencias innecesarias.

## Añadir un proyecto nuevo

Crea un archivo `.json` en `src/content/projects/` (el nombre del archivo no importa, solo su contenido):

```json
{
  "title": "Nombre del proyecto",
  "description": "Descripción breve.",
  "image": "/assets/images/nombre-preview.png",
  "tags": ["Tecnología1", "Tecnología2"],
  "githubUrl": "https://github.com/usuario/repo",
  "demoUrl": "https://usuario.github.io/repo"
}
```

`demoUrl` es opcional — si el proyecto no tiene demo online, simplemente omite el campo. La tarjeta se genera automáticamente en la sección de proyectos.

## Añadir una tecnología o categoría

Cada categoría es un archivo `.json` en `src/content/tech-categories/`, con esta forma:

```json
{
  "title": "Nombre de la categoría",
  "items": [
    {
      "name": "Nombre",
      "viewBox": "0 0 24 24",
      "icon": "<path d=\"...\"></path>"
    }
  ]
}
```

El `icon` es el contenido interno de un `<svg>` (el `<path>`), tomado preferentemente de [Simple Icons](https://simpleicons.org/); cuando una tecnología no tiene ahí un icono de marca adecuado, se usa el de otra librería de iconos equivalente. El `viewBox` no siempre es `0 0 24 24` (por ejemplo Java y LinkedIn usan `0 0 128 128`) — cópialo siempre tal cual lo da la fuente original, no lo asumas.

## Desarrollo local

Requiere Node.js. Instala dependencias y arranca el servidor de desarrollo:

```bash
npm install
npm run dev
```

## Licencia

Uso personal — código disponible como referencia.
