export const CARS = {

    starter: {
        id: "starter",
        name: "Street Starter",
        price: 0,

        color: 0x00ff88,

        maxSpeed: 0.45,
        acceleration: 0.012,
        handling: 0.035
    },

    blaze: {
        id: "blaze",
        name: "Blaze R",
        price: 500,

        color: 0xff3030,

        maxSpeed: 0.58,
        acceleration: 0.016,
        handling: 0.038
    },

    phantom: {
        id: "phantom",
        name: "Phantom X",
        price: 1200,

        color: 0x8844ff,

        maxSpeed: 0.68,
        acceleration: 0.019,
        handling: 0.042
    },

    volt: {
        id: "volt",
        name: "Volt RS",
        price: 2500,

        color: 0x00aaff,

        maxSpeed: 0.78,
        acceleration: 0.022,
        handling: 0.046
    },

    titan: {
        id: "titan",
        name: "Titan GT",
        price: 5000,

        color: 0xffaa00,

        maxSpeed: 0.88,
        acceleration: 0.025,
        handling: 0.050
    }

};


export function getCar(carId) {

    return CARS[carId] || CARS.starter;

}


export function getAllCars() {

    return Object.values(CARS);

}
