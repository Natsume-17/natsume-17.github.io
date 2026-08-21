import * as THREE from "three";

const PARTICLE_COUNT = 300;
const CONNECTION_DISTANCE = 8; // distancia máxima para dibujar línea entre dos partículas

let scene, camera, renderer, particles, lines;
let mouseX = 0,
  mouseY = 0;

// se comprueba una sola vez al iniciar: si cambia en pleno uso,
// no merece la pena reiniciar la escena por un caso tan raro
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const positions = createParticlePositions();
  particles = createParticles(positions);
  lines = createConnections(positions);

  scene.add(particles);
  scene.add(lines);

  window.addEventListener("resize", onResize);
  // el parallax por ratón también es «movimiento» que puede
  // resultar incómodo, así que se omite igual que la rotación
  if (!prefersReducedMotion) {
    window.addEventListener("mousemove", onMouseMove);
  }

  animate();
}

// --- Genera y devuelve las posiciones para reutilizarlas
// tanto en las partículas como en el cálculo de líneas ---
function createParticlePositions() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }
  return positions;
}

// --- Textura circular generada por código, sin archivos externos ---
function createCircleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(1, "rgba(255,255,255,0)"); // desvanece hacia el borde, evita el efecto «cuadrado duro»

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

function createParticles(positions) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xff8c42,
    size: 0.5, // tamaño de las partículas
    map: createCircleTexture(),
    transparent: true,
    opacity: 0.5, // muy tenue, las partículas deben sugerir, no gritar
    alphaTest: 0.01, // descarta píxeles casi transparentes del mapa, evita cuadrados fantasma
    depthWrite: false, // evita que partículas cercanas «tapen» a las lejanas de forma brusca
  });

  return new THREE.Points(geometry, material);
}

// --- Calcula qué pares de partículas están lo bastante cerca
// y construye la geometría de líneas entre estas ---
function createConnections(positions) {
  const linePositions = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const ax = positions[i * 3];
    const ay = positions[i * 3 + 1];
    const az = positions[i * 3 + 2];

    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      const bx = positions[j * 3];
      const by = positions[j * 3 + 1];
      const bz = positions[j * 3 + 2];

      const dist = Math.hypot(ax - bx, ay - by, az - bz);

      if (dist < CONNECTION_DISTANCE) {
        linePositions.push(ax, ay, az, bx, by, bz);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(linePositions, 3),
  );

  const material = new THREE.LineBasicMaterial({
    color: 0xff8c42,
    transparent: true,
    opacity: 0.1, // muy tenue, las líneas deben sugerir, no gritar
  });

  return new THREE.LineSegments(geometry, material);
}

function onMouseMove(event) {
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

  if (!prefersReducedMotion) {
    particles.rotation.y += 0.0006;
    lines.rotation.y += 0.0006; // misma rotación que las partículas, para que las líneas sigan encajando

    camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 5 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);
  }

  renderer.render(scene, camera);
}
