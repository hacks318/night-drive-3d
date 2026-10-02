export function setupMenu({ onPlay, onGarage }) {

    const playButton = document.getElementById("playButton");
    const garageButton = document.getElementById("garageButton");

    if (playButton) {
        playButton.addEventListener("click", () => {
            onPlay();
        });
    }

    if (garageButton) {
        garageButton.addEventListener("click", () => {
            onGarage();
        });
    }
}
