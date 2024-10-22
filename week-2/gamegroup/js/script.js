// Define variables
let initialCenterImage = document.createElement('img');
initialCenterImage.src = 'images/aim.png'; // Your image path
initialCenterImage.style.position = 'fixed';
initialCenterImage.style.left = '50%';
initialCenterImage.style.top = '50%';
initialCenterImage.style.transform = 'translate(-50%, -50%)';
initialCenterImage.style.zIndex = '1'; // Behind the clicked images
document.body.appendChild(initialCenterImage);

let clipSize = 6;
let totalAmmo = 18;
let currentClip = clipSize;
let remainingAmmo = totalAmmo - clipSize; // Ammo left after initial clip
let ammoDisplay = document.createElement('div');
ammoDisplay.style.position = 'fixed';
ammoDisplay.style.top = '10px';
ammoDisplay.style.left = '50%';
ammoDisplay.style.transform = 'translateX(-50%)';
ammoDisplay.style.color = '#f59517';
ammoDisplay.style.fontFamily = '"Western", cursive';
ammoDisplay.style.fontSize = '24px';
ammoDisplay.style.zIndex = '4';
document.body.appendChild(ammoDisplay);
updateAmmoDisplay();

let score = 0;
let highScore = 0;
let timer = 60;
let timerDisplay = document.createElement('div');
timerDisplay.style.position = 'fixed';
timerDisplay.style.top = '40px';
timerDisplay.style.left = '50%';
timerDisplay.style.transform = 'translateX(-50%)';
timerDisplay.style.color = '#f59517';
timerDisplay.style.fontFamily = '"Western", cursive';
timerDisplay.style.fontSize = '24px';
timerDisplay.style.zIndex = '4';
document.body.appendChild(timerDisplay);
updateTimerDisplay();

// Create start button
const startButton = document.createElement('button');
startButton.innerText = 'START GAME';
startButton.style.position = 'fixed';
startButton.style.top = '50%';
startButton.style.left = '50%';
startButton.style.transform = 'translate(-50%, -50%)';
startButton.style.zIndex = '3';
document.body.appendChild(startButton);

startButton.onclick = () => {
    document.body.removeChild(startButton);
    startGame();
};

function updateAmmoDisplay() {
    ammoDisplay.innerHTML = `Ammo: ${currentClip} / ${remainingAmmo}`;
}

function updateTimerDisplay() {
    timerDisplay.innerHTML = `Time: ${timer}s`;
}

function startGame() {
    // Create targets
    setInterval(moveTarget, 1000); // Change position of target every second
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance to spawn "aim2.png"
            createTarget('images/aim2.png', true);
        } else {
            createTarget('images/aim.png', false);
        }
    }, 1000);

    // Start timer
    let countdown = setInterval(() => {
        timer--;
        updateTimerDisplay();
        if (timer <= 0) {
            clearInterval(countdown);
            endGame();
        }
    }, 1000);
}

function createTarget(src, isSpecial) {
    let target = document.createElement('img');
    target.src = src;
    target.style.position = 'fixed';
    target.style.left = `${Math.random() * 100}%`;
    target.style.top = `${Math.random() * 100}%`;
    target.style.transform = 'translate(-50%, -50%)';
    target.style.zIndex = '1'; // Behind the clicked images
    target.onclick = () => {
        targetHit(isSpecial);
        document.body.removeChild(target);
    };
    document.body.appendChild(target);
}

function targetHit(isSpecial) {
    score += isSpecial ? 100 : 50;
    if (isSpecial) {
        remainingAmmo += 6;
    }
    currentClip--;
    updateAmmoDisplay();
}

function endGame() {
    if (score > highScore) {
        highScore = score;
    }
    alert(`Game Over! Your score: ${score}. High score: ${highScore}.`);
    let restartButton = document.createElement('button');
    restartButton.innerText = 'RESTART GAME';
    restartButton.style.position = 'fixed';
    restartButton.style.top = '50%';
    restartButton.style.left = '50%';
    restartButton.style.transform = 'translate(-50%, -50%)';
    restartButton.style.zIndex = '3';
    restartButton.onclick = () => {
        document.location.reload();
    };
    document.body.appendChild(restartButton);
}
