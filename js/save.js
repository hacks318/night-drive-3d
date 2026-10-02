const SAVE_KEY = "night_drive_3d_save";

const DEFAULT_SAVE = {
    money: 0,

    selectedCar: "starter",

    ownedCars: [
        "starter"
    ]
};

export function loadSave() {

    try {

        const saved = localStorage.getItem(SAVE_KEY);

        if (!saved) {
            return {
                ...DEFAULT_SAVE,
                ownedCars: [...DEFAULT_SAVE.ownedCars]
            };
        }

        const data = JSON.parse(saved);

        return {
            ...DEFAULT_SAVE,
            ...data,

            ownedCars: Array.isArray(data.ownedCars)
                ? data.ownedCars
                : [...DEFAULT_SAVE.ownedCars]
        };

    } catch (error) {

        console.error(
            "Erro ao carregar o save:",
            error
        );

        return {
            ...DEFAULT_SAVE,
            ownedCars: [...DEFAULT_SAVE.ownedCars]
        };
    }
}


export function saveGame(data) {

    try {

        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(data)
        );

        console.log(
            "Jogo salvo com sucesso!"
        );

        return true;

    } catch (error) {

        console.error(
            "Erro ao salvar o jogo:",
            error
        );

        return false;
    }
}


export function resetSave() {

    localStorage.removeItem(SAVE_KEY);

    console.log(
        "Save apagado."
    );
              }
