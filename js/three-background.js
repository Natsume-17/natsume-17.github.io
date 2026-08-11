import * as THREE from "three";

// Número de partículas: bajo para no penalizar rendimiento en dispostivos móviles
const PARTICLE_COUNT = 300;

let scene, camera, renderer, particles;
let mouseX = 0,
  mouseY = 0;

export function initBackground() {
  const canvas = document.getElementById("bg-canvas");

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // limita a 2x para no reventar rendimiento en pantallas retina

  particles = createParticles();
  scene.add(particles);

  window.addEventListener("resize", onResize);
  window.addEventListener("mousemove", onMouseMove);

  animate();
}

function createParticles() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3); // x, y, z por partícula

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50; // z
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xff8c42, // mismo ámbar de --color-accent
    size: 0.6,
    transparent: true,
    opacity: 0.5, // sutil, no debe competir con el texto
  });

  return new THREE.Points(geometry, material);
}

function onMouseMove(event) {
  // normaliza la posición del ratón a un rango pequeño (-1 a 1)
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  // rotación lenta constante, da vida aunque el usuario no mueva el ratón
  particles.rotation.y += 0.0006;

  // parallax suave: la cámara sigue levemente al ratón, con interpolación
  // (el * 0.02 hace que el movimiento sea sutil, no brusco)
  camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
  camera.position.y += (-mouseY * 5 - camera.position.y) * 0.02;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
