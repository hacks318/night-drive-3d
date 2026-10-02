import * as THREE from "three";

export function createPoliceCar() {

    const police = new THREE.Group();

    // Corpo
    const bodyGeometry = new THREE.BoxGeometry(2.2, 0.55, 4.2);

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.7,
        roughness: 0.3
    });

    const body = new THREE.Mesh(
        bodyGeometry,
        bodyMaterial
    );

    body.position.y = 0.65;

    police.add(body);


    // Teto
    const roofGeometry = new THREE.BoxGeometry(
        1.6,
        0.45,
        1.8
    );

    const roofMaterial = new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
        metalness: 0.3,
        roughness: 0.4
    });

    const roof = new THREE.Mesh(
        roofGeometry,
        roofMaterial
    );

    roof.position.y = 1.1;

    police.add(roof);


    // Rodas
    const wheelGeometry = new THREE.CylinderGeometry(
        0.38,
        0.38,
        0.28,
        16
    );

    const wheelMaterial = new THREE.MeshStandardMaterial({
        color: 0x050505,
        roughness: 0.8
    });

    const wheelPositions = [
        [-1.05, 0.4, -1.35],
        [1.05, 0.4, -1.35],
        [-1.05, 0.4, 1.35],
        [1.05, 0.4, 1.35]
    ];

    for (const position of wheelPositions) {

        const wheel = new THREE.Mesh(
            wheelGeometry,
            wheelMaterial
        );

        wheel.rotation.z = Math.PI / 2;

        wheel.position.set(
            position[0],
            position[1],
            position[2]
        );

        police.add(wheel);
    }


    // Barra de polícia
    const lightBarGeometry = new THREE.BoxGeometry(
        1.0,
        0.18,
        0.35
    );

    const redMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });

    const blueMaterial = new THREE.MeshBasicMaterial({
        color: 0x0066ff
    });

    const redLight = new THREE.Mesh(
        lightBarGeometry,
        redMaterial
    );

    redLight.position.set(
        -0.25,
        1.42,
        0
    );

    police.add(redLight);


    const blueLight = new THREE.Mesh(
        lightBarGeometry,
        blueMaterial
    );

    blueLight.position.set(
        0.25,
        1.42,
        0
    );

    police.add(blueLight);


    return police;
}


/*
    Faz a polícia perseguir o jogador.
*/

export function updatePolice(
    police,
    player,
    speed = 0.025
) {

    if (!police || !player) return;

    const direction = new THREE.Vector3();

    direction.subVectors(
        player.position,
        police.position
    );

    direction.y = 0;

    if (direction.length() > 0.1) {

        direction.normalize();

        police.position.x +=
            direction.x * speed;

        police.position.z +=
            direction.z * speed;

        police.rotation.y =
            Math.atan2(
                direction.x,
                direction.z
            );
    }
         }
