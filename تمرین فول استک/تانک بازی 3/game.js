/* =============================
   گرفتن canvas
============================= */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

/* =============================
   متغیرهای اصلی بازی
============================= */

let score = 0;
let lives = 100;
let wave = 1;

let difficulty = "normal";

let gameRunning = false;

/* =============================
   تنظیمات هر سطح
============================= */

const difficultySettings = {
  easy: {
    enemySpeed: 1,
    spawnRate: 140,
  },

  normal: {
    enemySpeed: 1.5,
    spawnRate: 110,
  },

  hard: {
    enemySpeed: 2.3,
    spawnRate: 80,
  },
};

/* =============================
   انتخاب سختی
============================= */

document.querySelectorAll(".difficulty-buttons button").forEach((btn) => {
  btn.onclick = () => {
    difficulty = btn.dataset.level;

    startGame();
  };
});

/* =============================
   شروع بازی
============================= */

function startGame() {
  score = 0;
  lives = 100;
  wave = 1;

  gameRunning = true;

  document.getElementById("startMenu").classList.add("hidden");

  requestAnimationFrame(loop);
}

/* =============================
   پایان بازی
============================= */

function gameOver() {
  gameRunning = false;

  document.getElementById("finalScore").textContent = score;

  document.getElementById("gameOverMenu").classList.remove("hidden");
}

/* =============================
   ریست بازی
============================= */

function restartGame() {
  location.reload();
}

/* =============================
   حلقه اصلی بازی
============================= */

function loop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();

  drawTank();

  requestAnimationFrame(loop);
}

/* =============================
   پس زمینه
============================= */

function drawBackground() {
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);

  grad.addColorStop(0, "#050510");
  grad.addColorStop(1, "#0a1505");

  ctx.fillStyle = grad;

  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/* =============================
   تانک
============================= */

function drawTank() {
  const x = canvas.width / 2;
  const y = canvas.height - 70;

  ctx.fillStyle = "#3a5a2a";

  ctx.fillRect(x - 30, y, 60, 20);
}
