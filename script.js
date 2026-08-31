const world = document.getElementById("world");

const keys = {};

let zoom = 1;
let rotation = 0;

const zoomSpeed = 0.005;
const rotationSpeed = 0.5;

window.addEventListener("keydown", function(event) {
    keys[event.key.toLowerCase()] = true;
});

window.addEventListener("keyup", function(event) {
    keys[event.key.toLowerCase()] = false;
});

function gameLoop() {

    // Move forward
    if (keys["w"] || keys["arrowup"]) {
        zoom += zoomSpeed;
    }

    // Move backward
    if (keys["s"] || keys["arrowdown"]) {
        zoom -= zoomSpeed;
    }

    // Look left
    if (keys["a"] || keys["arrowleft"]) {
        rotation -= rotationSpeed;
    }

    // Look right
    if (keys["d"] || keys["arrowright"]) {
        rotation += rotationSpeed;
    }

    // Prevent zooming too far out
    if (zoom < 1) {
        zoom = 1;
    }

    // Prevent extreme zoom
    if (zoom > 3) {
        zoom = 3;
    }

    world.style.transform =
        `scale(${zoom}) rotate(${rotation}deg)`;

    requestAnimationFrame(gameLoop);
}

gameLoop();
