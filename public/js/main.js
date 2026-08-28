/* ============================================
   PUNTO DE ENTRADA PRINCIPAL
   Inicializa los módulos de comportamiento del
   sitio una vez cargado el DOM. El renderizado
   de proyectos y tecnologías ahora lo gestiona
   Astro (Content Collections), no este archivo.
   ============================================ */

import { initBackground } from "./three-background.js";
import { initNavSpy } from "./nav-spy.js";
import { initReveal } from "./reveal.js";

document.addEventListener("DOMContentLoaded", () => {
  initBackground(); // fondo animado con Three.js
  initNavSpy(); // resalta el enlace de nav activo según scroll
  initReveal(); // animaciones de aparición al hacer scroll
});
