import * as THREE from "three";

import { getCar } from "./cars.js";
import { setupControls } from "./controls.js";
import {
    createPoliceCar,
    updatePolice
} from "./police.js";


export function setupGame({
    getSaveData,
    onMoneyChange,
    onWantedChange
}) {

    const gameElement =
        document.getElementById("game");


    /* =========================
       THREE.JS
    ========================= */

    const scene = new THREE.Scene();

    scene.background =
        new THREE.Color(0x02040a);


    /* =========================
       CÂMERA
    ========================= */

    const camera =
        new THREE.PerspectiveCamera(
            65,
            window.innerWidth /
            window.innerHeight,
            0.1,
            1000
        );


    /* =========================
       RENDERIZADOR
    ========================= */

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.shadowMap.enabled = true;

    gameElement.appendChild(
        renderer.domElement
    );


    /* =========================
       LUZ DA LUA
    ========================= */

    const moonLight =
        new THREE.DirectionalLight(
            0x8899ff,
            1.5
        );

    moonLight.position.set(
        -50,
        80,
        -30
    );

    moonLight.castShadow = true;

    scene.add(moonLight);


    const ambientLight =
        new THREE.AmbientLight(
            0x334466,
            1.2
        );

    scene.add(ambientLight);


    /* =========================
       CHÃO
    ========================= */

    const groundGeometry =
        new THREE.PlaneGeometry(
            500,
            500
        );

    const groundMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x050708,
            roughness: 0.95
        });

    const ground =
        new THREE.Mesh(
            groundGeometry,
            groundMaterial
        );

    ground.rotation.x =
        -Math.PI / 2;

    ground.receiveShadow = true;

    scene.add(ground);


    /* =========================
       ESTRADA
    ========================= */

    const roadGeometry =
        new THREE.PlaneGeometry(
            16,
            500
        );

    const roadMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x111318,
            roughness: 0.9
        });

    const road =
        new THREE.Mesh(
            roadGeometry,
            roadMaterial
        );

    road.rotation.x =
        -Math.PI / 2;

    road.position.y = 0.01;

    scene.add(road);


    /* =========================
       FAIXAS DA ESTRADA
    ========================= */

    const lineMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xffffcc
        });

    for (
        let z = -240;
        z < 250;
        z += 10
    ) {

        const lineGeometry =
            new THREE.BoxGeometry(
                0.18,
                0.03,
                5
            );

        const line =
            new THREE.Mesh(
                lineGeometry,
                lineMaterial
            );

        line.position.set(
            0,
            0.05,
            z
        );

        scene.add(line);
    }


    /* =========================
       PRÉDIOS
    ========================= */

    function createBuilding(
        x,
        z,
        width,
        height,
        depth
    ) {

        const geometry =
            new THREE.BoxGeometry(
                width,
                height,
                depth
            );

        const material =
            new THREE.MeshStandardMaterial({
                color:
                    Math.random() > 0.5
                        ? 0x111827
                        : 0x17202b,

                roughness: 0.85
            });

        const building =
            new THREE.Mesh(
                geometry,
                material
            );

        building.position.set(
            x,
            height / 2,
            z
        );

        building.castShadow = true;

        building.receiveShadow = true;

        scene.add(building);


        /* JANELAS */

        const windowMaterial =
            new THREE.MeshBasicMaterial({
                color: 0xffdd66
            });

        for (
            let y = 2;
            y < height - 1;
            y += 3
        ) {

            for (
                let wx = -width / 2 + 1;
                wx < width / 2 - 0.5;
                wx += 2
            ) {

                if (Math.random() > 0.55) {

                    const window =
                        new THREE.Mesh(
                            new THREE.BoxGeometry(
                                0.35,
                                0.55,
                                0.04
                            ),
                            windowMaterial
                        );

                    window.position.set(
                        x + wx,
                        y,
                        z - depth / 2 - 0.03
                    );

                    scene.add(window);
                }
            }
        }
    }


    /* =========================
       CRIA CIDADE
    ========================= */

    for (
        let z = -240;
        z < 250;
        z += 18
    ) {

        createBuilding(
            -15 - Math.random() * 10,
            z,
            7 + Math.random() * 5,
            8 + Math.random() * 30,
            10
        );

        createBuilding(
            15 + Math.random() * 10,
            z + 8,
            7 + Math.random() * 5,
            8 + Math.random() * 30,
            10
        );
    }


    /* =========================
       CARRO DO JOGADOR
    ========================= */

    function createPlayerCar(carData) {

        const car =
            new THREE.Group();


        /* CARROCERIA */

        const bodyGeometry =
            new THREE.BoxGeometry(
                2.2,
                0.65,
                4.3
            );

        const bodyMaterial =
            new THREE.MeshStandardMaterial({
                color: carData.color,
                metalness: 0.65,
                roughness: 0.28
            });

        const body =
            new THREE.Mesh(
                bodyGeometry,
                bodyMaterial
            );

        body.position.y = 0.65;

        body.castShadow = true;

        car.add(body);


        /* TETO */

        const roofGeometry =
            new THREE.BoxGeometry(
                1.65,
                0.55,
                1.9
            );

        const roofMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x111111,
                metalness: 0.2,
                roughness: 0.25
            });

        const roof =
            new THREE.Mesh(
                roofGeometry,
                roofMaterial
            );

        roof.position.y = 1.15;

        car.add(roof);


        /* RODAS */

        const wheelGeometry =
            new THREE.CylinderGeometry(
                0.38,
                0.38,
                0.28,
                20
            );

        const wheelMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x030303,
                roughness: 0.85
            });


        const wheelPositions = [
            [-1.05, 0.4, -1.35],
            [1.05, 0.4, -1.35],
            [-1.05, 0.4, 1.35],
            [1.05, 0.4, 1.35]
        ];


        for (const position of wheelPositions) {

            const wheel =
                new THREE.Mesh(
                    wheelGeometry,
                    wheelMaterial
                );

            wheel.rotation.z =
                Math.PI / 2;

            wheel.position.set(
                position[0],
                position[1],
                position[2]
            );

            wheel.castShadow = true;

            car.add(wheel);
        }


        /* FARÓIS */

        const headlightMaterial =
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            });


        const leftHeadlight =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.45,
                    0.18,
                    0.05
                ),
                headlightMaterial
            );

        leftHeadlight.position.set(
            -0.65,
            0.72,
            -2.16
        );

        car.add(leftHeadlight);


        const rightHeadlight =
            leftHeadlight.clone();

        rightHeadlight.position.x =
            0.65;

        car.add(rightHeadlight);


        return car;
    }


    const saveData =
        getSaveData();

    const carData =
        getCar(
            saveData.selectedCar
        );


    const player =
        createPlayerCar(carData);

    player.position.set(
        0,
        0,
        20
    );

    scene.add(player);


    /* =========================
       CONTROLES
    ========================= */

    const controls =
        setupControls();


    /* =========================
       POLÍCIA
    ========================= */

    const policeCars = [];


    for (let i = 0; i < 3; i++) {

        const police =
            createPoliceCar();

        police.position.set(
            -8 + i * 8,
            0,
            35 + i * 10
        );

        scene.add(police);

        policeCars.push(police);
    }


    /* =========================
       VARIÁVEIS
    ========================= */

    let speed = 0;

    let wanted = 0;

    let running = false;

    let paused = false;

    let lastTime = 0;

    let animationFrame;


    /* =========================
       CÂMERA
    ========================= */

    function updateCamera() {

        const cameraOffset =
            new THREE.Vector3(
                0,
                5,
                8
            );

        const targetPosition =
            cameraOffset.clone();

        targetPosition.applyQuaternion(
            player.quaternion
        );

        targetPosition.add(
            player.position
        );

        camera.position.lerp(
            targetPosition,
            0.08
        );

        camera.lookAt(
            player.position.x,
            player.position.y + 1,
            player.position.z
        );
    }


    /* =========================
       MOVIMENTO
    ========================= */

    function updatePlayer(delta) {

        if (controls.isGasPressed()) {

            speed +=
                carData.acceleration *
                delta *
                60;

        } else {

            speed *= 0.985;
        }


        if (controls.isBrakePressed()) {

            speed *= 0.94;
        }


        speed = Math.max(
            -0.15,
            Math.min(
                speed,
                carData.maxSpeed
            )
        );


        if (controls.isLeftPressed()) {

            player.rotation.y +=
                carData.handling *
                delta *
                60;
        }


        if (controls.isRightPressed()) {

            player.rotation.y -=
                carData.handling *
                delta *
                60;
        }


        const forward =
            new THREE.Vector3(
                0,
                0,
                -1
            );

        forward.applyQuaternion(
            player.quaternion
        );


        player.position.add(
            forward.multiplyScalar(
                speed *
                delta *
                60
            )
        );


        /* LIMITA A ESTRADA */

        player.position.x =
            THREE.MathUtils.clamp(
                player.position.x,
                -6.5,
                6.5
            );
    }


    /* =========================
       DINHEIRO
    ========================= */

    function rewardPlayer() {

        if (
            Math.abs(speed) >
            carData.maxSpeed * 0.75
        ) {

            if (Math.random() < 0.01) {

                saveData.money += 1;

                onMoneyChange(
                    saveData.money
                );
            }
        }
    }


    /* =========================
       PROCURADO
    ========================= */

    function updateWanted() {

        if (
            Math.abs(speed) >
            carData.maxSpeed * 0.85
        ) {

            wanted += 0.002;

        } else {

            wanted -= 0.001;
        }


        wanted =
            THREE.MathUtils.clamp(
                wanted,
                0,
                5
            );


        onWantedChange(
            Math.floor(wanted)
        );
    }


    /* =========================
       LOOP
    ========================= */

    function animate(time) {

        animationFrame =
            requestAnimationFrame(
                animate
            );


        if (!running || paused) {
            return;
        }


        const delta =
            Math.min(
                (time - lastTime) / 1000,
                0.05
            );


        lastTime = time;


        updatePlayer(delta);

        updateWanted();

        rewardPlayer();


        /* POLÍCIA */

        for (const police of policeCars) {

            updatePolice(
                police,
                player,
                0.018 +
                wanted * 0.004
            );
        }


        updateCamera();

        renderer.render(
            scene,
            camera
        );
    }


    /* =========================
       RESIZE
    ========================= */

    function resize() {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }


    window.addEventListener(
        "resize",
        resize
    );


    /* =========================
       CONTROLE DO JOGO
    ========================= */

    function start() {

        if (running) return;

        running = true;

        paused = false;

        lastTime =
            performance.now();

        animate(lastTime);
    }


    function pause() {

        paused = true;
    }


    function resume() {

        paused = false;

        lastTime =
            performance.now();
    }


    function stop() {

        running = false;

        paused = false;

        cancelAnimationFrame(
            animationFrame
        );
    }


    return {

        start,

        pause,

        resume,

        stop
    };
      }
