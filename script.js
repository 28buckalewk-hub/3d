const world = document.getElementById("world");

const keys = {};

let zoom = 1;
let panX = 50;

const zoomSpeed = 0.005;

/* 3x faster panning */
const panSpeed = 0.6;


window.addEventListener("keydown", function(event) {
    keys[event.key.toLowerCase()] = true;
});


window.addEventListener("keyup", function(event) {
    keys[event.key.toLowerCase()] = false;
});


function gameLoop() {

    /* Move forward */
    if (keys["w"] || keys["arrowup"]) {
        zoom += zoomSpeed;
    }

    /* Move backward */
    if (keys["s"] || keys["arrowdown"]) {
        zoom -= zoomSpeed;
    }

    /* Look left */
    if (keys["a"] || keys["arrowleft"]) {
        panX -= panSpeed;
    }

    /* Look right */
    if (keys["d"] || keys["arrowright"]) {
        panX += panSpeed;
    }


    /* Limit zoom */
    zoom = Math.max(1, Math.min(3, zoom));

    /* Limit panning */
    panX = Math.max(0, Math.min(100, panX));


    /* Apply movement to landscape only */
    world.style.transform = `scale(${zoom})`;

    world.style.backgroundPosition = `${panX}% center`;


    requestAnimationFrame(gameLoop);
}


gameLoop();
