/* ============================================
   NAV SPY
   Resalta el enlace de la sección cuyo CENTRO
   está más cerca de la línea de referencia bajo
   el header. Robusto ante secciones de distinta
   altura, y funciona igual en ambas direcciones.
   ============================================ */

export function initNavSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__links a");

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateActiveSection();
      ticking = false;
    });
  });

  updateActiveSection();

  function updateActiveSection() {
    // línea de referencia: un poco por debajo del header,
    // en la franja alta del viewport (donde «miras» al leer)
    const referenceLine = getComputedHeaderHeight() + window.innerHeight * 0.5;

    let closestId = sections[0].getAttribute("id");
    let closestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(sectionCenter - referenceLine);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestId = section.getAttribute("id");
      }
    });

    updateActiveLink(closestId);
  }

  function updateActiveLink(activeId) {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("is-active", isMatch);
    });
  }
}

function getComputedHeaderHeight() {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    "--header-height",
  );
  return parseInt(value, 10) || 72;
}
