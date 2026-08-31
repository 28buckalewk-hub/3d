// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.set(0, 8, 12);

// Renderer
const renderer = new THREE.WebGLRenderer({
antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 10, 5);

scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// Ground
const groundGeometry = new THREE.PlaneGeometry(50, 50);

const groundMaterial = new THREE.MeshStandardMaterial({
color: 0x228B22
});

const ground = new THREE.Mesh(
groundGeometry,
groundMaterial
);

ground.rotation.x = -Math.PI / 2;

scene.add(ground);

// Player
const playerGeometry = new THREE.BoxGeometry(1, 1, 1);

const playerMaterial = new THREE.MeshStandardMaterial({
color: 0x2196F3
});

const player = new THREE.Mesh(
playerGeometry,
playerMaterial
);

player.position.y = 0.5;

scene.add(player);

// Collectibles
const collectibles = [];

const collectibleGeometry = new THREE.BoxGeometry(
0.7,
0.7,
0.7
);

const collectibleMaterial = new THREE.MeshStandardMaterial({
color: 0xFFD700,
emissive: 0x553300
});

function createCollectible() {

const collectible = new THREE.Mesh(
    collectibleGeometry,
    collectibleMaterial
);

collectible.position.x = Math.random() * 30 - 15;
collectible.position.z = Math.random() * 30 - 15;
collectible.position.y = 0.5;

scene.add(collectible);

collectibles.push(collectible);

}

// Create starting collectibles
for (let i = 0; i < 10; i++) {
createCollectible();
}

// Keyboard controls
const keys = {};

window.addEventListener("keydown", (event) => {
keys[event.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (event) => {
keys[event.key.toLowerCase()] = false;
});

let score = 0;
const speed = 0.15;

// Check collisions
function checkCollisions() {

for (let i = collectibles.length - 1; i >= 0; i--) {

    const collectible = collectibles[i];

    const distance = player.position.distanceTo(
        collectible.position
    );

    if (distance < 1) {

        scene.remove(collectible);

        collectibles.splice(i, 1);

        score++;

        document.getElementById("score").textContent =
            "Score: " + score;

        createCollectible();
    }
}

}

// Game loop
function animate() {

requestAnimationFrame(animate);

// Player movement
if (keys["w"] || keys["arrowup"]) {
    player.position.z -= speed;
}

if (keys["s"] || keys["arrowdown"]) {
    player.position.z += speed;
}

if (keys["a"] || keys["arrowleft"]) {
    player.position.x -= speed;
}

if (keys["d"] || keys["arrowright"]) {
    player.position.x += speed;
}

// Keep player inside map
player.position.x = Math.max(
    -24,
    Math.min(24, player.position.x)
);

player.position.z = Math.max(
    -24,
    Math.min(24, player.position.z)
);

// Rotate collectibles
collectibles.forEach((collectible) => {

    collectible.rotation.x += 0.02;
    collectible.rotation.y += 0.03;

});

// Camera follows player
camera.position.x = player.position.x;
camera.position.z = player.position.z + 12;

camera.lookAt(
    player.position.x,
    player.position.y,
    player.position.z
);

checkCollisions();

renderer.render(scene, camera);

}

animate();

// Resize window
window.addEventListener("resize", () => {

camera.aspect =
    window.innerWidth / window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

});
