// نمایش بازی انتخاب شده
function showGame(gameId) {
  const games = document.querySelectorAll(".game");
  games.forEach((game) => game.classList.remove("active"));
  document.getElementById(gameId).classList.add("active");
  if (gameId === "tic-tac-toe") initTicTacToe();
  if (gameId === "snake") initSnake();
  if (gameId === "pong") initPong();
}

// Tic-Tac-Toe
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function initTicTacToe() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  renderBoard();
}

function renderBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.textContent = cell;
    cellElement.addEventListener("click", () => handleCellClick(index));
    boardElement.appendChild(cellElement);
  });
}

function handleCellClick(index) {
  if (board[index] !== "" || !gameActive) return;
  board[index] = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  renderBoard();
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      alert(`${board[a]} برنده شد!`);
      gameActive = false;
      return;
    }
  }
  if (!board.includes("")) {
    alert("مساوی!");
    gameActive = false;
  }
}

function resetTicTacToe() {
  initTicTacToe();
}

// Snake
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 100, y: 100 };
let score = 0;
let snakeCanvas, snakeCtx;

function initSnake() {
  snakeCanvas = document.getElementById("snake-canvas");
  snakeCtx = snakeCanvas.getContext("2d");
  snake = [{ x: 200, y: 200 }];
  direction = { x: 0, y: 0 };
  food = {
    x: Math.floor(Math.random() * 20) * 20,
    y: Math.floor(Math.random() * 20) * 20,
  };
  score = 0;
  document.addEventListener("keydown", changeDirection);
  gameLoop();
}

function changeDirection(event) {
  const key = event.key;
  if (key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -20 };
  if (key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 20 };
  if (key === "ArrowLeft" && direction.x === 0) direction = { x: -20, y: 0 };
  if (key === "ArrowRight" && direction.x === 0) direction = { x: 20, y: 0 };
}

function gameLoop() {
  if (!document.getElementById("snake").classList.contains("active")) return;
  updateSnake();
  drawSnake();
  setTimeout(gameLoop, 100);
}

function updateSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 20) * 20,
      y: Math.floor(Math.random() * 20) * 20,
    };
  } else {
    snake.pop();
  }
  if (
    head.x < 0 ||
    head.x >= 400 ||
    head.y < 0 ||
    head.y >= 400 ||
    snake
      .slice(1)
      .some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    alert("بازی تمام شد! امتیاز: " + score);
    resetSnake();
  }
}

function drawSnake() {
  snakeCtx.clearRect(0, 0, 400, 400);
  snakeCtx.fillStyle = "green";
  snake.forEach((segment) => snakeCtx.fillRect(segment.x, segment.y, 20, 20));
  snakeCtx.fillStyle = "red";
  snakeCtx.fillRect(food.x, food.y, 20, 20);
}

function resetSnake() {
  initSnake();
}

// Pong
let pongCanvas, pongCtx;
let ball = { x: 200, y: 100, dx: 2, dy: 2 };
let paddle = { x: 175, y: 180, width: 50, height: 10 };
let scorePong = 0;

function initPong() {
  pongCanvas = document.getElementById("pong-canvas");
  pongCtx = pongCanvas.getContext("2d");
  ball = { x: 200, y: 100, dx: 2, dy: 2 };
  paddle = { x: 175, y: 180, width: 50, height: 10 };
  scorePong = 0;
  document.addEventListener("mousemove", movePaddle);
  pongLoop();
}

function movePaddle(event) {
  const rect = pongCanvas.getBoundingClientRect();
  paddle.x = event.clientX - rect.left - paddle.width / 2;
  if (paddle.x < 0) paddle.x = 0;
  if (paddle.x > 400 - paddle.width) paddle.x = 400 - paddle.width;
}

function pongLoop() {
  if (!document.getElementById("pong").classList.contains("active")) return;
  updatePong();
  drawPong();
  setTimeout(pongLoop, 16);
}

function updatePong() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  if (ball.x <= 0 || ball.x >= 400) ball.dx = -ball.dx;
  if (ball.y <= 0) ball.dy = -ball.dy;
  if (
    ball.y >= 180 &&
    ball.x >= paddle.x &&
    ball.x <= paddle.x + paddle.width
  ) {
    ball.dy = -ball.dy;
    scorePong++;
  }
  if (ball.y > 200) {
    alert("بازی تمام شد! امتیاز: " + scorePong);
    resetPong();
  }
}

function drawPong() {
  pongCtx.clearRect(0, 0, 400, 200);
  pongCtx.fillStyle = "white";
  pongCtx.fillRect(ball.x - 5, ball.y - 5, 10, 10);
  pongCtx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function resetPong() {
  initPong();
}
