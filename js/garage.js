import {
    getAllCars
} from "./cars.js";

export function setupGarage({
    getSaveData,
    onDataChange,
    onBack
}) {

    const carList =
        document.getElementById("carList");

    const backButton =
        document.getElementById("backGarage");


    function render() {

        const saveData =
            getSaveData();

        const cars =
            getAllCars();

        carList.innerHTML = "";


        for (const car of cars) {

            const card =
                document.createElement("div");

            card.className = "carCard";


            const title =
                document.createElement("h2");

            title.textContent =
                car.name;


            const info =
                document.createElement("p");


            const owned =
                saveData.ownedCars.includes(
                    car.id
                );

            const equipped =
                saveData.selectedCar ===
                car.id;


            if (equipped) {

                info.textContent =
                    "🚗 EQUIPADO";

            } else if (owned) {

                info.textContent =
                    "✅ COMPRADO";

            } else if (car.price === 0) {

                info.textContent =
                    "🆓 GRÁTIS";

            } else {

                info.textContent =
                    `💰 $${car.price}`;
            }


            const button =
                document.createElement("button");


            if (equipped) {

                button.textContent =
                    "EQUIPADO";

                button.disabled = true;

            } else if (owned) {

                button.textContent =
                    "EQUIPAR";

                button.addEventListener(
                    "click",
                    () => {

                        const data =
                            getSaveData();

                        data.selectedCar =
                            car.id;

                        onDataChange(data);

                        render();
                    }
                );

            } else {

                button.textContent =
                    car.price === 0
                        ? "PEGAR GRÁTIS"
                        : `COMPRAR $${car.price}`;


                button.addEventListener(
                    "click",
                    () => {

                        const data =
                            getSaveData();


                        if (
                            car.price > data.money
                        ) {

                            alert(
                                "💰 Dinheiro insuficiente!"
                            );

                            return;
                        }


                        data.money -=
                            car.price;


                        data.ownedCars.push(
                            car.id
                        );


                        data.selectedCar =
                            car.id;


                        onDataChange(data);

                        render();
                    }
                );
            }


            card.appendChild(title);

            card.appendChild(info);

            card.appendChild(button);

            carList.appendChild(card);
        }
    }


    if (backButton) {

        backButton.addEventListener(
            "click",
            () => {

                onBack();
            }
        );
    }


    return {
        render
    };
                    }
