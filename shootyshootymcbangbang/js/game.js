const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const playerImage = new Image();
playerImage.src = "images/player.png";

const badGuyImage = new Image();
badGuyImage.src = "images/badguy.png";

const background = new Image();
background.src = "images/background.png";

const sight = new Image();
sight.src = "images/sight.png";

let player = { x: canvas.width / 2, y: canvas.height / 2, size: 40, rotation: 0, health: 3 };
let badGuys = [];
let bullets = [];
let score = 0;
let gameRunning = false;
let backgroundOffset = 0;

const playButton = document.getElementById("play-button");
const retryButton = document.getElementById("retry-button");
const mainMenu = document.getElementById("main-menu");
const gameOverScreen = document.getElementById("game-over");
const scoreDisplay = document.getElementById("score-display");
const scoreBoard = document.createElement("div");
scoreBoard.id = "score";
document.body.appendChild(scoreBoard);

playButton.onclick = startGame;
retryButton.onclick = restartGame;

mainMenu.style.display = "block";
canvas.style.cursor = "none";

function startGame() {
    gameRunning = true;
    mainMenu.style.display = "none";
    gameOverScreen.style.display = "none";
    scoreBoard.style.display = "block";
    resetGame();
    requestAnimationFrame(gameLoop);
}

function restartGame() {
    startGame();
}

function resetGame() {
    player.health = 3;
    badGuys = [];
    bullets = [];
    score = 0;
    backgroundOffset = 0;
    scoreBoard.textContent = `Score: ${score}`;
}

window.addEventListener("mousemove", (event) => {
    const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x);
    player.rotation = angle;
});

window.addEventListener("mousedown", () => {
    shootBullet();
});

function shootBullet() {
    bullets.push({ x: player.x, y: player.y, angle: player.rotation });
}

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "w":
            player.y -= 10;
            break;
        case "s":
            player.y += 10;
            break;
        case "a":
            player.x -= 10;
            break;
        case "d":
            player.x += 10;
            break;
    }
});

function spawnBadGuy() {
    const x = Math.random() * canvas.width;
    const y = Math.random() < 0.5 ? -50 : canvas.height + 50;
    const angle = Math.atan2(player.y - y, player.x - x);
    badGuys.push({ x, y, angle });
}

setInterval(() => {
    if (gameRunning) spawnBadGuy();
}, 1000);

function drawPlayer() {
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.rotation);
    ctx.drawImage(playerImage, -player.size / 2, -player.size / 2, player.size, player.size);
    ctx.restore();
}

function drawBadGuys() {
    for (let badGuy of badGuys) {
        badGuy.x += Math.cos(badGuy.angle) * 2;
        badGuy.y += Math.sin(badGuy.angle) * 2;

        ctx.drawImage(badGuyImage, badGuy.x - 20, badGuy.y - 20, 40, 40);

        if (Math.hypot(player.x - badGuy.x, player.y - badGuy.y) < 20) {
            player.health--;
            badGuys.splice(badGuys.indexOf(badGuy), 1);
            if (player.health <= 0) endGame();
        }
    }
}

function drawBullets() {
    for (let bullet of bullets) {
        bullet.x += Math.cos(bullet.angle) * 10;
        bullet.y += Math.sin(bullet.angle) * 10;

        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();

        for (let badGuy of badGuys) {
            if (Math.hypot(bullet.x - badGuy.x, bullet.y - badGuy.y) < 20) {
                score += 10;
                scoreBoard.textContent = `Score: ${score}`;
                badGuys.splice(badGuys.indexOf(badGuy), 1);
                bullets.splice(bullets.indexOf(bullet), 1);
            }
        }
    }
}

function drawBackground() {
    backgroundOffset += 2;
    if (backgroundOffset > canvas.height) backgroundOffset = 0;

    ctx.drawImage(background, 0, backgroundOffset - canvas.height, canvas.width, canvas.height);
    ctx.drawImage(background, 0, backgroundOffset, canvas.width, canvas.height);
}

function drawCursor(event) {
    ctx.drawImage(sight, event.clientX - 16, event.clientY - 16, 32, 32);
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    drawPlayer();
    drawBadGuys();
    drawBullets();

    requestAnimationFrame(gameLoop);
}

function endGame() {
    gameRunning = false;
    gameOverScreen.style.display = "block";
    scoreBoard.style.display = "none";
    scoreDisplay.innerText = `Score: ${score}`;
}
