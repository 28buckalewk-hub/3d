const world = document.getElementById("world");

const keys = {};

let zoom = 1;
let panX = 50;

const zoomSpeed = 0.005;
const panSpeed = 0.15;

window.addEventListener("keydown", function(event) {
    keys[event.key.toLowerCase()] = true;
});

window.addEventListener("keyup", function(event) {
    keys[event.key.toLowerCase()] = false;
});

function gameLoop() {

    // Move forward / zoom in
    if (keys["w"] || keys["arrowup"]) {
        zoom += zoomSpeed;
    }

    // Move backward / zoom out
    if (keys["s"] || keys["arrowdown"]) {
        zoom -= zoomSpeed;
    }

    // Look left
    if (keys["a"] || keys["arrowleft"]) {
        panX -= panSpeed;
    }

    // Look right
    if (keys["d"] || keys["arrowright"]) {
        panX += panSpeed;
    }

    // Limit zoom
    if (zoom < 1) {
        zoom = 1;
    }

    if (zoom > 3) {
        zoom = 3;
    }

    // Limit panning
    if (panX < 0) {
        panX = 0;
    }

    if (panX > 100) {
        panX = 100;
    }

    // Apply zoom and horizontal camera panning
    world.style.transform = `scale(${zoom})`;

    world.style.backgroundPosition =
        `${panX}% center`;

    requestAnimationFrame(gameLoop);
}

gameLoop();
