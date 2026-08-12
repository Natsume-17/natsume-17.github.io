# natsume-17.github.io

Portafolio personal — desarrollador web júnior. Landing page, presentación de proyectos y contacto, desplegado con GitHub Pages.

🔗 **Demo en vivo:** [natsume-17.github.io](https://natsume-17.github.io)

## Stack

- **HTML5** semántico
- **CSS3** — variables nativas (custom properties), grid y flexbox, diseño adaptable
- **JavaScript (ES6+)** — módulos nativos, sin frameworks ni bundler
- **Three.js** — fondo animado de partículas con efecto parallax

Sin build tool: JS plano con `<script type="module">`, Three.js cargado vía import map desde CDN.

## Estructura del proyecto

```
├── index.html
├── css/
│   ├── reset.css        # normaliza estilos del navegador
│   ├── variables.css     # paleta de colores, tipografía, espaciados
│   ├── main.css           # layout general y estructura de la página
│   └── components.css    # piezas reutilizables (botones, tarjetas, badges)
├── js/
│   ├── main.js               # punto de entrada
│   ├── three-background.js    # escena Three.js (partículas + parallax)
│   ├── projects-data.js      # datos de proyectos (array editable)
│   ├── tech-data.js           # tecnologías por categoría + habilidades blandas
│   ├── nav-spy.js             # resalta la sección activa en el nav al hacer scroll
│   └── reveal.js               # animaciones de entrada (fade-in + slide-up)
├── assets/
│   ├── images/
│   └── icons/
└── robots.txt
```

## Características

- Diseño oscuro con acentos ámbar, estética minimalista-futurista.
- Fondo 3D de partículas conectadas (estilo constelación) que reacciona al ratón.
- Proyectos y tecnologías renderizados dinámicamente desde archivos de datos (`projects-data.js`, `tech-data.js`) — añadir contenido nuevo no requiere tocar el HTML.
- Scroll spy: resalta en el nav la sección visible.
- Animaciones de entrada al hacer scroll, con `IntersectionObserver`.
- Accesible: navegación por teclado con foco visible, contraste WCAG AA, `prefers-reduced-motion` respetado también en la animación 3D.
- SEO básico: meta tags Open Graph/Twitter Card, `robots.txt`.
- Optimizado para rendimiento: lazy-loading de imágenes, partículas limitadas, sin dependencias innecesarias.

## Añadir un proyecto nuevo

Edita `js/projects-data.js` y añade un objeto al array `projects`:

```javascript
{
  title: 'Nombre del proyecto',
  description: 'Descripción breve.',
  image: 'assets/images/nombre-preview.png',
  tags: ['Tecnología1', 'Tecnología2'],
  githubUrl: 'https://github.com/usuario/repo',
  demoUrl: null, // o la URL de la demo si existe
}
```

La tarjeta se genera automáticamente, sin editar `index.html`.

## Desarrollo local

No requiere instalación de dependencias. Basta con abrir `index.html` con Live Server (extensión de VS Code) o cualquier servidor estático local.

## Licencia

Uso personal — código disponible como referencia.
