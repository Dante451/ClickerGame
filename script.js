// ------------------
// Current Version
// ------------------
const GAME_VERSION = "v1.1.0";
// ------------------
// Game State
// ------------------
let game = {
  score: 0,
  clickPower: 1,
  clickUpgradeCost: 10,
  idleIncome: 0,
  idleUpgradeCost: 25
};
// ------------------
// DOM Elements
// ------------------
const scoreEl = document.getElementById("score");
const clickBox = document.getElementById("clickBox");
const upgradeClickBtn = document.getElementById("upgradeClickBtn");
const clickCostEl = document.getElementById("clickCost");
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const resetBtn = document.getElementById("resetBtn");
const idleIncomeEl = document.getElementById("idleIncome");
const statusEl = document.getElementById("status");
const upgradeIdleBtn = document.getElementById("upgradeIdleBtn");
const idleCostEl = document.getElementById("idleCost");
const clickPowerEl = document.getElementById("clickPowerDisplay");
const clickFloat = document.getElementById("clickFloat");
// ------------------
// Update UI
// ------------------
function updateUI() {
  game.score = game.score || 0;
  game.clickPower = game.clickPower || 1;
  game.clickUpgradeCost = game.clickUpgradeCost || 10;
  game.idleIncome = game.idleIncome || 0;
  game.idleUpgradeCost = game.idleUpgradeCost || 25;

  scoreEl.textContent = game.score;
  clickCostEl.textContent = game.clickUpgradeCost;
  idleIncomeEl.textContent = game.idleIncome;
  idleCostEl.textContent = game.idleUpgradeCost;
  clickPowerEl.textContent = game.clickPower;
  upgradeClickBtn.disabled = game.score < game.clickUpgradeCost;
  upgradeIdleBtn.disabled = game.score < game.idleUpgradeCost;
}
upgradeClickBtn.addEventListener("click", () => {
  if (game.score >= game.clickUpgradeCost) {
    game.score -= game.clickUpgradeCost;
    game.clickPower += 1;
    game.clickUpgradeCost = Math.floor(game.clickUpgradeCost * 1.5);
    updateUI();
    showStatus("Upgraded!");
  } else {
    showStatus("Not enough money!");
  }
});

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

  // show floating text
  clickFloat.textContent = `+${game.clickPower}`;
  clickFloat.style.opacity = "1";
  clickFloat.classList.add("show");

  setTimeout(() => {
    clickFloat.classList.remove("show");
    clickFloat.style.opacity = "0";
  }, 400);

  updateUI();
});

// ------------------
// Idle Income Upgrade
// ------------------
setInterval(() => {
  game.score += game.idleIncome || 0;
  updateUI();
}, 1000);

upgradeIdleBtn.addEventListener("click", () => {
  if (game.score >= game.idleUpgradeCost) {
    game.score -= game.idleUpgradeCost;
    game.idleIncome += 1;

    game.idleUpgradeCost = Math.floor(game.idleUpgradeCost * 1.6);

    updateUI();
    showStatus("Idle income upgraded!");
  } else {
    showStatus("Not enough money!");
  }
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

  if (!saved) {
    showStatus("No save found!");
    return;
  }

  try {
    const parsed = JSON.parse(saved);

    game = {
        score: parsed.score ?? 0,
        clickPower: parsed.clickPower ?? 1,
        clickUpgradeCost: parsed.clickUpgradeCost ?? 10,
        idleIncome: parsed.idleIncome ?? 0,
        idleUpgradeCost: parsed.idleUpgradeCost ?? 25
    };

    updateUI();
    showStatus("Game loaded!");
  } catch (e) {
    console.error("Load failed", e);
    showStatus("Load error!");
  }
}
// ------------------
// Reset Game
// ------------------
function resetGame() {
  localStorage.removeItem("clickerSave");

    game = {
    score: 0,
    clickPower: 1,
    clickUpgradeCost: 10,
    idleIncome: 0,
    idleUpgradeCost: 25
    };
    updateUI();
}
// ------------------
// Button Events
// ------------------
saveBtn.addEventListener("click", () => saveGame(true));
loadBtn.addEventListener("click", loadGame);
resetBtn.addEventListener("click", resetGame);
// ------------------
// On Load
// ------------------
window.onload = () => {
  loadGame();
  updateUI();

  document.getElementById("version").textContent = GAME_VERSION;
};