import { initBackground } from "./three-background.js";
import { projects } from "./projects-data.js";
import { initNavSpy } from "./nav-spy.js";
import { initReveal } from "./reveal.js";
import { techCategories, softSkills } from "./tech-data.js";

document.addEventListener("DOMContentLoaded", () => {
  initBackground();
  renderProjects();
  initNavSpy();
  initReveal();
  renderTech();
});

function renderProjects() {
  const grid = document.querySelector(".projects__grid");

  // por cada proyecto del array, generamos su tarjeta y la insertamos
  projects.forEach((project) => {
    grid.appendChild(createProjectCard(project));
  });
}

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";

  // el enlace de demo solo se genera si existe; si no, se omite del todo
  const demoLink = project.demoUrl
    ? `<a href="${project.demoUrl}" target="_blank" rel="noopener">Demo →</a>`
    : "";

  const tagsHtml = project.tags
    .map((tag) => `<span class="project-card__tag">${tag}</span>`)
    .join("");

  article.innerHTML = `
    <img class="project-card__image" src="${project.image}" alt="Captura del proyecto ${project.title}">
    <div class="project-card__body">
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__description">${project.description}</p>
      <div class="project-card__tags">${tagsHtml}</div>
      <div class="project-card__links">
        <a href="${project.githubUrl}" target="_blank" rel="noopener">GitHub →</a>
        ${demoLink}
      </div>
    </div>
  `;

  return article;
}

function renderTech() {
  const container = document.querySelector(".tech__categories");

  techCategories.forEach((category) => {
    const block = document.createElement("div");
    block.className = "tech__category";

    const badgesHtml = category.items
      .map(
        (item) => `
        <span class="tech-badge">
          <svg class="tech-badge__icon" viewBox="${item.viewBox}">${item.icon}</svg>
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
