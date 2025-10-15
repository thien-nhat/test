const fireflyCanvas = document.createElement('canvas');
fireflyCanvas.style.position = 'fixed';
fireflyCanvas.style.top = '0';
fireflyCanvas.style.left = '0';
fireflyCanvas.style.width = '100%';
fireflyCanvas.style.height = '100%';
fireflyCanvas.style.pointerEvents = 'none';
document.body.appendChild(fireflyCanvas);
const fCtx = fireflyCanvas.getContext('2d');
fireflyCanvas.width = window.innerWidth;
fireflyCanvas.height = window.innerHeight;
class Firefly {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * fireflyCanvas.width;
    this.y = Math.random() * fireflyCanvas.height;
    this.radius = 1 + Math.random() * 4;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.2 + Math.random() * 0.4;
    this.opacity = Math.random();
    this.opacityChange = 0.005 + Math.random() * 0.015;
    this.waveOffset = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += Math.cos(this.angle + Math.sin(Date.now()/2000 + this.waveOffset) * 0.5) * this.speed;
    this.y += Math.sin(this.angle + Math.cos(Date.now()/2000 + this.waveOffset) * 0.5) * this.speed;
    this.opacity += this.opacityChange;
    if (this.opacity > 1 || this.opacity < 0) this.opacityChange *= -1;
    if (this.x < 0 || this.x > fireflyCanvas.width || this.y < 0 || this.y > fireflyCanvas.height) {
      this.reset();
    }
  }
  draw() {
    fCtx.beginPath();
    fCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    fCtx.fillStyle = `rgba(255, 255, 180, ${this.opacity})`;
    fCtx.shadowBlur = 15;
    fCtx.shadowColor = 'rgba(255, 255, 180, 1)';
    fCtx.fill();
  }
}
let fireflies = [];
for (let i = 0; i < 100; i++) fireflies.push(new Firefly());
function animateFireflies() {
  fCtx.clearRect(0, 0, fireflyCanvas.width, fireflyCanvas.height);
  fireflies.forEach(f => { f.update(); f.draw(); });
  requestAnimationFrame(animateFireflies);
}
animateFireflies();
window.addEventListener('resize', () => {
  fireflyCanvas.width = window.innerWidth;
  fireflyCanvas.height = window.innerHeight;
});

const explosionCanvas = document.createElement('canvas');
explosionCanvas.style.position = 'fixed';
explosionCanvas.style.top = '0';
explosionCanvas.style.left = '0';
explosionCanvas.style.width = '100%';
explosionCanvas.style.height = '100%';
explosionCanvas.style.pointerEvents = 'none';
document.body.appendChild(explosionCanvas);
const eCtx = explosionCanvas.getContext('2d');
explosionCanvas.width = window.innerWidth;
explosionCanvas.height = window.innerHeight;

class Particle {
  constructor(x, y, color) {
    this.x = x; this.y = y;
    this.radius = 2 + Math.random() * 3;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 1 + Math.random() * 3;
    this.life = 1;
    this.decay = 0.02 + Math.random() * 0.02;
    this.color = color;
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.life -= this.decay;
  }
  draw() {
    eCtx.beginPath();
    eCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    eCtx.fillStyle = `rgba(${this.color}, ${this.life})`;
    eCtx.shadowBlur = 10;
    eCtx.shadowColor = `rgba(${this.color}, 1)`;
    eCtx.fill();
  }
}

let particles = [];
function createExplosion(x, y) {
  const colors = [
    "255,200,150",
    "255,255,180",
    "255,180,200",
    "200,255,200"
  ];
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(x, y, colors[Math.floor(Math.random()*colors.length)]));
  }
}
function animateExplosion() {
  eCtx.clearRect(0, 0, explosionCanvas.width, explosionCanvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateExplosion);
}
animateExplosion();
window.addEventListener('resize', () => {
  explosionCanvas.width = window.innerWidth;
  explosionCanvas.height = window.innerHeight;
});

const bgMusic = document.getElementById("bg-music");
bgMusic.currentTime = 2;

bgMusic.addEventListener("ended", () => {
  bgMusic.currentTime = 2;
  bgMusic.play();
});

bgMusic.play().catch(() => {
  const startMusic = () => {
    bgMusic.currentTime = 2;
    bgMusic.play();
    document.removeEventListener("click", startMusic);
    document.removeEventListener("touchstart", startMusic);
  };
  document.addEventListener("click", startMusic, { once: true });
  document.addEventListener("touchstart", startMusic, { once: true });
});