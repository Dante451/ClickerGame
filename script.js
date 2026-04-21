// ------------------
// Game State
// ------------------
let game = {
  score: 0,
  clickPower: 1
};

// ------------------
// DOM Elements
// ------------------
const scoreEl = document.getElementById("score");
const clickBox = document.getElementById("clickBox");
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const resetBtn = document.getElementById("resetBtn");

// ------------------
// Update UI
// ------------------
function updateUI() {
  scoreEl.textContent = game.score;
}

function showStatus(message) {
  statusEl.textContent = message;

  setTimeout(() => {
    statusEl.textContent = "";
  }, 2000);
}

// ------------------
// Click Logic
// ------------------
clickBox.addEventListener("click", () => {
  game.score += game.clickPower;
  updateUI();
});

// ------------------
// Save Game
// ------------------
function saveGame(showMessage = false) {
  localStorage.setItem("clickerSave", JSON.stringify(game));

  if (showMessage) {
  showStatus("Game saved!");
    }
}

// ------------------
// Load Game
// ------------------
function loadGame() {
  const saved = localStorage.getItem("clickerSave");

  if (saved) {
    try {
      game = JSON.parse(saved);
      updateUI();
      showStatus("Game loaded!");
    } catch (e) {
      console.error("Load failed", e);
    }
  } else {
    showStatus("No save found!");
  }
}

// ------------------
// Reset Game
// ------------------
function resetGame() {
  localStorage.removeItem("clickerSave");
  game = { score: 0, clickPower: 1 };
  updateUI();
}

// ------------------
// Auto Save (every 5s)
// ------------------
setInterval(() => saveGame(false), 5000);

// ------------------
// Button Events
// ------------------
saveBtn.addEventListener("click", () => saveGame(true));
loadBtn.addEventListener("click", loadGame);
resetBtn.addEventListener("click", resetGame);
const statusEl = document.getElementById("status");
// ------------------
// On Load
// ------------------
window.onload = () => {
  loadGame();
  updateUI();
};