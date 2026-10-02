import { setupMenu } from "./menu.js";
import { setupGarage } from "./garage.js";
import { setupGame } from "./game.js";
import { loadSave, saveGame } from "./save.js";

const menu = document.getElementById("menu");
const garage = document.getElementById("garage");
const game = document.getElementById("game");
const pauseMenu = document.getElementById("pauseMenu");

const saveExitButton = document.getElementById("saveExitButton");
const noSaveExitButton = document.getElementById("noSaveExitButton");
const cancelExitButton = document.getElementById("cancelExitButton");
const continueButton = document.getElementById("continueButton");

let saveData = loadSave();

function showScreen(screen) {
    menu.classList.add("hidden");
    garage.classList.add("hidden");
    game.classList.add("hidden");

    screen.classList.remove("hidden");
}

function updateMoney() {
    document.getElementById("menuMoney").textContent = saveData.money;
    document.getElementById("garageMoney").textContent = saveData.money;
    document.getElementById("moneyValue").textContent = saveData.money;
}

const gameController = setupGame({
    getSaveData: () => saveData,

    onMoneyChange: (money) => {
        saveData.money = money;
        updateMoney();
    },

    onWantedChange: (wanted) => {
        document.getElementById("wantedValue").textContent = wanted;
    }
});

setupMenu({
    onPlay: () => {
        showScreen(game);

        gameController.start();

        updateMoney();
    },

    onGarage: () => {
        showScreen(garage);

        garageController.render();
        updateMoney();
    }
});

const garageController = setupGarage({
    getSaveData: () => saveData,

    onDataChange: (newData) => {
        saveData = newData;
        updateMoney();
    },

    onBack: () => {
        showScreen(menu);
        updateMoney();
    }
});

document.getElementById("pauseButton").addEventListener("click", () => {
    gameController.pause();
    pauseMenu.classList.remove("hidden");
});

continueButton.addEventListener("click", () => {
    pauseMenu.classList.add("hidden");
    gameController.resume();
});

saveExitButton.addEventListener("click", () => {
    saveGame(saveData);

    gameController.stop();

    pauseMenu.classList.add("hidden");

    showScreen(menu);

    updateMoney();
});

noSaveExitButton.addEventListener("click", () => {
    saveData = loadSave();

    gameController.stop();

    pauseMenu.classList.add("hidden");

    showScreen(menu);

    updateMoney();
});

cancelExitButton.addEventListener("click", () => {
    pauseMenu.classList.add("hidden");
    gameController.resume();
});

updateMoney();
