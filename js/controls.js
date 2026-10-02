export function setupControls() {

    const keys = {
        left: false,
        right: false,
        gas: false,
        brake: false
    };

    const buttons = {
        left: document.getElementById("leftButton"),
        right: document.getElementById("rightButton"),
        gas: document.getElementById("gasButton"),
        brake: document.getElementById("brakeButton")
    };

    function setControl(name, value) {
        keys[name] = value;
    }

    function addTouchControl(button, name) {

        if (!button) return;

        button.addEventListener("touchstart", (event) => {
            event.preventDefault();
            setControl(name, true);
        }, { passive: false });

        button.addEventListener("touchend", (event) => {
            event.preventDefault();
            setControl(name, false);
        }, { passive: false });

        button.addEventListener("touchcancel", () => {
            setControl(name, false);
        });
    }

    addTouchControl(buttons.left, "left");
    addTouchControl(buttons.right, "right");
    addTouchControl(buttons.gas, "gas");
    addTouchControl(buttons.brake, "brake");


    /* CONTROLES DO TECLADO */

    window.addEventListener("keydown", (event) => {

        if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
            keys.left = true;
        }

        if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
            keys.right = true;
        }

        if (
            event.key === "ArrowUp" ||
            event.key.toLowerCase() === "w"
        ) {
            keys.gas = true;
        }

        if (
            event.key === "ArrowDown" ||
            event.key.toLowerCase() === "s"
        ) {
            keys.brake = true;
        }
    });


    window.addEventListener("keyup", (event) => {

        if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
            keys.left = false;
        }

        if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
            keys.right = false;
        }

        if (
            event.key === "ArrowUp" ||
            event.key.toLowerCase() === "w"
        ) {
            keys.gas = false;
        }

        if (
            event.key === "ArrowDown" ||
            event.key.toLowerCase() === "s"
        ) {
            keys.brake = false;
        }
    });


    return {

        isLeftPressed() {
            return keys.left;
        },

        isRightPressed() {
            return keys.right;
        },

        isGasPressed() {
            return keys.gas;
        },

        isBrakePressed() {
            return keys.brake;
        }

    };
                                }
