/* ============================================
   REVEAL ON SCROLL
   Añade la clase .is-visible a los elementos
   .reveal cuando entran en el viewport, una
   sola vez (no se repite al salir/entrar).
   ============================================ */

export function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(onIntersect, {
    threshold: 0.15, // se dispara cuando el 15% del elemento es visible
  });

  elements.forEach((el) => observer.observe(el));

  function onIntersect(entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target); // ya animó: dejamos de observarlo
    });
  }
}
