// Game State
let gameState = "menu"; // 'menu', 'playing', 'paused', 'gameover'
let difficulty = "normal";
let score = 0;
let lives = 3;
let wave = 1;
let health = 100;
let isPaused = false;

// Canvas Setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Difficulty Settings
const diffSettings = {
  easy: { spawnRate: 120, enemySpeed: 1, enemyHealth: 1 },
  normal: { spawnRate: 90, enemySpeed: 1.5, enemyHealth: 1.5 },
  hard: { spawnRate: 60, enemySpeed: 2.5, enemyHealth: 2 },
};

// Game Objects
let tank = null;
let enemies = [];
let bullets = [];
let powerups = [];
let particles = [];

// Timing
let frameCount = 0;
let lastShot = 0;
let shootCooldown = 20;
let rapidFireActive = false;
let rapidFireEnd = 0;

// DOM Elements
const mainMenu = document.getElementById("mainMenu");
const gameScreen = document.getElementById("gameScreen");
const pauseOverlay = document.getElementById("pauseOverlay");
const startBtn = document.getElementById("startBtn");
const resumeBtn = document.getElementById("resumeBtn");
const mainMenuBtn = document.getElementById("mainMenuBtn");
const diffBtns = document.querySelectorAll(".diff-btn");

// Resize Canvas
function resizeCanvas() {
  const container = document.getElementById("canvasContainer");
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
}

// Tank Class
class Tank {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 80;
    this.angle = -Math.PI / 2;
    this.size = 25;
    this.turretLength = 30;
  }

  rotate(dir) {
    this.angle += dir * 0.08;
  }

  shoot() {
    const now = frameCount;
    const cooldown = rapidFireActive ? 5 : shootCooldown;

    if (now - lastShot >= cooldown) {
      const bulletX = this.x + Math.cos(this.angle) * this.turretLength;
      const bulletY = this.y + Math.sin(this.angle) * this.turretLength;
      bullets.push(new Bullet(bulletX, bulletY, this.angle));
      lastShot = now;

      // Muzzle flash particles
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(bulletX, bulletY, "#ffaa00"));
      }
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Tank body
    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);

    // Turret
    ctx.rotate(this.angle);
    ctx.fillStyle = "#27ae60";
    ctx.fillRect(0, -5, this.turretLength, 10);

    ctx.restore();
  }
}

// Bullet Class
class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 8;
    this.radius = 4;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }

  draw() {
    ctx.fillStyle = "#f39c12";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  isOffScreen() {
    return (
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height
    );
  }
}

// Enemy Class
class Enemy {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = -30;
    this.size = 20;
    this.speed = diffSettings[difficulty].enemySpeed;
    this.health = diffSettings[difficulty].enemyHealth;
    this.maxHealth = this.health;
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size,
    );

    // Health bar
    if (this.health < this.maxHealth) {
      ctx.fillStyle = "#c0392b";
      ctx.fillRect(
        this.x - this.size / 2,
        this.y - this.size / 2 - 8,
        this.size,
        3,
      );
      ctx.fillStyle = "#2ecc71";
      ctx.fillRect(
        this.x - this.size / 2,
        this.y - this.size / 2 - 8,
        this.size * (this.health / this.maxHealth),
        3,
      );
    }
  }

  reachedBottom() {
    return this.y > canvas.height;
  }
}

// Powerup Class
class Powerup {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // 'heal', 'bomb', 'rapid'
    this.size = 15;
    this.speed = 2;
    this.colors = {
      heal: "#2ecc71",
      bomb: "#e67e22",
      rapid: "#3498db",
    };
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    ctx.fillStyle = this.colors[this.type];
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    // Icon
    ctx.fillStyle = "#fff";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const icons = { heal: "+", bomb: "💣", rapid: "⚡" };
    ctx.fillText(icons[this.type], this.x, this.y);
  }

  reachedBottom() {
    return this.y > canvas.height;
  }
}

// Particle Class
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.life = 30;
    this.maxLife = 30;
    this.color = color;
    this.size = Math.random() * 3 + 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  draw() {
    ctx.globalAlpha = this.life / this.maxLife;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  isDead() {
    return this.life <= 0;
  }
}

// Collision Detection
function checkCollision(obj1, obj2, radius1, radius2) {
  const dx = obj1.x - obj2.x;
  const dy = obj1.y - obj2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < radius1 + radius2;
}

// Game Functions
function spawnEnemy() {
  const spawnRate = diffSettings[difficulty].spawnRate;
  if (frameCount % spawnRate === 0) {
    enemies.push(new Enemy());
  }
}

function spawnPowerup() {
  if (Math.random() < 0.002) {
    const types = ["heal", "bomb", "rapid"];
    const type = types[Math.floor(Math.random() * types.length)];
    powerups.push(new Powerup(Math.random() * canvas.width, -20, type));
  }
}

function updateGame() {
  if (gameState !== "playing" || isPaused) return;

  frameCount++;

  // Spawn enemies
  spawnEnemy();
  spawnPowerup();

  // Update bullets
  bullets.forEach((bullet, index) => {
    bullet.update();
    if (bullet.isOffScreen()) {
      bullets.splice(index, 1);
    }
  });

  // Update enemies
  enemies.forEach((enemy, eIndex) => {
    enemy.update();

    // Check bullet collision
    bullets.forEach((bullet, bIndex) => {
      if (checkCollision(enemy, bullet, enemy.size / 2, bullet.radius)) {
        enemy.health -= 1;
        bullets.splice(bIndex, 1);

        if (enemy.health <= 0) {
          score += 10;
          enemies.splice(eIndex, 1);

          // Explosion particles
          for (let i = 0; i < 15; i++) {
            particles.push(new Particle(enemy.x, enemy.y, "#e74c3c"));
          }
        }
      }
    });

    // Check if reached bottom
    if (enemy.reachedBottom()) {
      enemies.splice(eIndex, 1);
      health -= 10;
      if (health <= 0) {
        lives--;
        health = 100;
        if (lives <= 0) {
          gameOver();
        }
      }
    }
  });

  // Update powerups
  powerups.forEach((powerup, index) => {
    powerup.update();

    // Check tank collision
    if (checkCollision(tank, powerup, tank.size / 2, powerup.size)) {
      activatePowerup(powerup.type);
      powerups.splice(index, 1);
    }

    if (powerup.reachedBottom()) {
      powerups.splice(index, 1);
    }
  });

  // Update particles
  particles.forEach((particle, index) => {
    particle.update();
    if (particle.isDead()) {
      particles.splice(index, 1);
    }
  });

  // Check rapid fire timeout
  if (rapidFireActive && frameCount >= rapidFireEnd) {
    rapidFireActive = false;
    updatePowerupIcons();
  }

  // Wave progression
  if (frameCount % 600 === 0) {
    wave++;
  }

  updateUI();
}

function activatePowerup(type) {
  switch (type) {
    case "heal":
      health = Math.min(100, health + 30);
      break;
    case "bomb":
      enemies.forEach((enemy) => {
        for (let i = 0; i < 10; i++) {
          particles.push(new Particle(enemy.x, enemy.y, "#e74c3c"));
        }
      });
      score += enemies.length * 10;
      enemies = [];
      break;
    case "rapid":
      rapidFireActive = true;
      rapidFireEnd = frameCount + 300;
      break;
  }
  updatePowerupIcons();
}

function updatePowerupIcons() {
  const container = document.getElementById("powerupIcons");
  container.innerHTML = "";

  if (rapidFireActive) {
    const icon = document.createElement("div");
    icon.className = "powerup-icon";
    icon.textContent = "⚡";
    icon.style.background = "#3498db";
    container.appendChild(icon);
  }
}

function drawGame() {
  // Clear canvas
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw grid
  ctx.strokeStyle = "#16213e";
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.width; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i < canvas.height; i += 40) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }

  // Draw game objects
  particles.forEach((p) => p.draw());
  bullets.forEach((b) => b.draw());
  enemies.forEach((e) => e.draw());
  powerups.forEach((p) => p.draw());
  if (tank) tank.draw();
}

function updateUI() {
  document.getElementById("score").textContent = score;
  document.getElementById("lives").textContent = lives;
  document.getElementById("wave").textContent = wave;

  const healthFill = document.getElementById("healthFill");
  healthFill.style.width = health + "%";

  if (health > 60) {
    healthFill.style.background = "#2ecc71";
  } else if (health > 30) {
    healthFill.style.background = "#f39c12";
  } else {
    healthFill.style.background = "#e74c3c";
  }
}

function gameLoop() {
  updateGame();
  drawGame();
  requestAnimationFrame(gameLoop);
}

function startGame() {
  gameState = "playing";
  score = 0;
  lives = 3;
  wave = 1;
  health = 100;
  frameCount = 0;
  enemies = [];
  bullets = [];
  powerups = [];
  particles = [];
  rapidFireActive = false;

  mainMenu.style.display = "none";
  gameScreen.style.display = "block";

  resizeCanvas();
  tank = new Tank();
  updateUI();
  updatePowerupIcons();
}

function pauseGame() {
  isPaused = true;
  pauseOverlay.style.display = "flex";
}

function resumeGame() {
  isPaused = false;
  pauseOverlay.style.display = "none";
}

function returnToMenu() {
  gameState = "menu";
  isPaused = false;
  mainMenu.style.display = "flex";
  gameScreen.style.display = "none";
  pauseOverlay.style.display = "none";
}

function gameOver() {
  alert(`Game Over!\nScore: ${score}\nWave: ${wave}`);
  returnToMenu();
}

// Event Listeners
startBtn.addEventListener("click", () => {
  startGame();
});

resumeBtn.addEventListener("click", () => {
  resumeGame();
});

mainMenuBtn.addEventListener("click", () => {
  returnToMenu();
});

diffBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    diffBtns.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    difficulty = btn.dataset.difficulty;
  });
});

// Keyboard Controls
const keys = {};
window.addEventListener("keydown", (e) => {
  keys[e.code] = true;

  if (e.code === "Space" && gameState === "playing" && !isPaused) {
    e.preventDefault();
    tank.shoot();
  }

  if (e.code === "KeyP" && gameState === "playing") {
    if (isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  }
});

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

// Continuous rotation
setInterval(() => {
  if (gameState === "playing" && !isPaused && tank) {
    if (keys["ArrowLeft"]) tank.rotate(-1);
    if (keys["ArrowRight"]) tank.rotate(1);
  }
}, 16);

// Window resize
window.addEventListener("resize", () => {
  if (gameState === "playing") {
    resizeCanvas();
    if (tank) {
      tank.x = canvas.width / 2;
      tank.y = canvas.height - 80;
    }
  }
});

// Start game loop
gameLoop();
