const world = document.getElementById("world");
const character = document.getElementById("character");

const keys = {};

let zoom = 1;
let panX = 50;

/* Character's position in the world */
let characterX = 50;

/* Speeds */
const zoomSpeed = 0.005;

/* 3x faster panning */
const panSpeed = 0.6;


/* Keyboard down */
window.addEventListener("keydown", function(event) {
    keys[event.key.toLowerCase()] = true;
});


/* Keyboard up */
window.addEventListener("keyup", function(event) {
    keys[event.key.toLowerCase()] = false;
});


function gameLoop() {

    /* =========================
       FORWARD / BACKWARD
    ========================= */

    if (keys["w"] || keys["arrowup"]) {
        zoom += zoomSpeed;
    }

    if (keys["s"] || keys["arrowdown"]) {
        zoom -= zoomSpeed;
    }


    /* =========================
       LOOK LEFT / RIGHT
    ========================= */

    if (keys["a"] || keys["arrowleft"]) {
        panX -= panSpeed;

        /* Character moves opposite camera */
        characterX += panSpeed * 0.5;
    }

    if (keys["d"] || keys["arrowright"]) {
        panX += panSpeed;

        /* Character moves opposite camera */
        characterX -= panSpeed * 0.5;
    }


    /* =========================
       LIMIT ZOOM
    ========================= */

    if (zoom < 1) {
        zoom = 1;
    }

    if (zoom > 3) {
        zoom = 3;
    }


    /* =========================
       LIMIT CAMERA PAN
    ========================= */

    if (panX < 0) {
        panX = 0;
    }

    if (panX > 100) {
        panX = 100;
    }


    /* =========================
       LIMIT CHARACTER
    ========================= */

    if (characterX < -20) {
        characterX = -20;
    }

    if (characterX > 120) {
        characterX = 120;
    }


    /* =========================
       APPLY CAMERA
    ========================= */

    world.style.transform = `scale(${zoom})`;

    world.style.backgroundPosition =
        `${panX}% center`;


    /* =========================
       APPLY CHARACTER POSITION
    ========================= */

    character.style.left = `${characterX}%`;


    requestAnimationFrame(gameLoop);
}


gameLoop();
