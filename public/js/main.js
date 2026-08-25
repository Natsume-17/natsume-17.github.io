import { initBackground } from "./three-background.js";
import { initNavSpy } from "./nav-spy.js";
import { initReveal } from "./reveal.js";
import { techCategories, softSkills } from "./tech-data.js";

document.addEventListener("DOMContentLoaded", () => {
  initBackground();
  initNavSpy();
  initReveal();
  renderTech();
});

function renderTech() {
  const container = document.querySelector(".tech__categories");

  techCategories.forEach((category) => {
    const block = document.createElement("div");
    block.className = "tech__category";

    const badgesHtml = category.items
      .map(
        (item) => `
        <span class="tech-badge">
          <svg class="tech-badge__icon" viewBox="${item.viewBox}" aria-hidden="true">${item.icon}</svg>
          ${item.name}
        </span>
      `,
      )
      .join("");

    block.innerHTML = `
      <h3 class="tech__category-title">${category.title}</h3>
      <div class="tech__grid">${badgesHtml}</div>
    `;

    container.appendChild(block);
  });

  renderSoftSkills();
}

function renderSoftSkills() {
  const container = document.querySelector(".soft-skills__items");
  container.innerHTML = softSkills
    .map((skill) => `<span class="soft-skills__item">${skill}</span>`)
    .join("");
}
