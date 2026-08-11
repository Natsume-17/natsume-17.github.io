import { initBackground } from "./three-background.js";
import { projects } from "./projects-data.js";

document.addEventListener("DOMContentLoaded", () => {
  initBackground();
  renderProjects();
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
