import { initBackground } from "./three-background.js";
import { initNavSpy } from "./nav-spy.js";
import { initReveal } from "./reveal.js";

document.addEventListener("DOMContentLoaded", () => {
  initBackground();
  initNavSpy();
  initReveal();
});
