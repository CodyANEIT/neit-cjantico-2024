let clipSize = 6;
let totalAmmo = 18;
let currentClip = clipSize;
let remainingAmmo = totalAmmo - clipSize;
let score = 0;
let gameTime = 60;
let gameInterval;
let targetInterval;
let gameStarted = false;

const ammoDisplay = document.getElementById('ammoDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');

ammoDisplay.style.position = 'fixed';
ammoDisplay.style.top = '10px';
ammoDisplay.style.left = '50%';
ammoDisplay.style.transform = 'translateX(-50%)';
ammoDisplay.style.color = '#f59517';
ammoDisplay.style.fontFamily = '"Western", cursive';
ammoDisplay.style.fontSize = '24px';
ammoDisplay.style.zIndex = '4';
updateAmmoDisplay();

function updateAmmoDisplay() {
    ammoDisplay.innerHTML = `Ammo: ${currentClip} / ${remainingAmmo}`;
}

function updateScoreDisplay() {
    scoreDisplay.innerHTML = `Score: ${score}`;
}

function updateTimerDisplay() {
    timerDisplay.innerHTML = `Time: ${gameTime}`;
}

startButton.onclick = startGame;
restartButton.onclick = restartGame;

function startGame() {
    gameStarted = true;
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    currentClip = clipSize;
    remainingAmmo = totalAmmo - clipSize;
    score = 0;
    gameTime = 60;
    updateAmmoDisplay();
    updateScoreDisplay();
    updateTimerDisplay();

    gameInterval = setInterval(() => {
        gameTime--;
        updateTimerDisplay();
        if (gameTime <= 0) {
            endGame();
        }
    }, 1000);

    targetInterval = setInterval(createTarget, 1000);
}

function createTarget() {
    const target = document.createElement('img');
    target.src = 'images/aim.png'; // Target image
    target.style.position = 'absolute';
    target.style.width = '50px';
    target.style.height = '50px';
    target.style.zIndex = '1';

    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
    document.body.appendChild(target);

    target.onclick = () => {
        score += 50;
        updateScoreDisplay();
        document.body.removeChild(target);
        if (Math.random() < 0.2) { // 20% chance to spawn a bonus target
            createBonusTarget(randomX, randomY);
        }
    };

    setTimeout(() => {
        if (document.body.contains(target)) {
            document.body.removeChild(target);
        }
    }, 2000);
}

function createBonusTarget(x, y) {
    const bonusTarget = document.createElement('img');
    bonusTarget.src = 'images/aim2.png'; // Bonus target image
    bonusTarget.style.position = 'absolute';
    bonusTarget.style.width = '50px';
    bonusTarget.style.height = '50px';
    bonusTarget.style.left = `${x}px`;
    bonusTarget.style.top = `${y}px`;
    document.body.appendChild(bonusTarget);

    bonusTarget.onclick = () => {
        score += 100;
        remainingAmmo += 6;
        updateAmmoDisplay();
        updateScoreDisplay();
        document.body.removeChild(bonusTarget);
    };

    setTimeout(() => {
        if (document.body.contains(bonusTarget)) {
            document.body.removeChild(bonusTarget);
        }
    }, 2000);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(targetInterval);
    gameStarted = false;
    restartButton.style.display = 'block';
    alert(`Game Over! Your Score: ${score}`);
}

function restartGame() {
    score = 0;
    gameTime = 60;
    updateScoreDisplay();
    updateTimerDisplay();
    startGame();
}

document.onclick = (event) => {
    if (gameStarted) {
        if (!reloadButton.contains(event.target) && !fireButton.contains(event.target)) {
            if (currentClip > 0) {
                currentClip--;
                updateAmmoDisplay();
                let audio = new Audio('./sounds/shot.mp3');
                audio.play();
                createFlash(event.pageX, event.pageY);
            } else {
                let audioEmpty = new Audio('./sounds/emptyshot.wav');
                audioEmpty.play();
            }
        }
    }
};

function createFlash(x, y) {
    let img = document.createElement('img');
    img.src = 'images/flash.png';
    img.style.position = 'absolute';
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = 'translate(-50%, -50%) scale(0)';
    img.style.transition = 'transform 0.1s, opacity 0.15s';
    img.style.zIndex = '2';
    document.body.appendChild(img);
    setTimeout(() => {
        img.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 0);
    setTimeout(() => {
        img.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(img);
        }, 150);
    }, 150);
}

// Reload functionality remains unchanged
document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyR' && currentClip < clipSize && remainingAmmo > 0) {
        let audio3 = new Audio('./sounds/reload.wav');
        audio3.play();
        if (remainingAmmo >= clipSize) {
            remainingAmmo -= (clipSize - currentClip);
            currentClip = clipSize;
        } else {
            currentClip = remainingAmmo;
            remainingAmmo = 0;
        }
        updateAmmoDisplay();
    }
});

// Reload and fire buttons
const reloadButton = document.createElement('button');
reloadButton.innerText = 'RELOAD';
reloadButton.style.position = 'fixed';
reloadButton.style.bottom = '20px';
reloadButton.style.left = '50%';
reloadButton.style.transform = 'translateX(-50%)';
reloadButton.style.zIndex = '3';
reloadButton.onclick = () => {
    let event = new KeyboardEvent('keydown', { 'code': 'KeyR' });
    document.dispatchEvent(event);
};
document.body.appendChild(reloadButton);

const fireButton = document.createElement('button');
fireButton.innerText = 'FIRE';
fireButton.style.position = 'fixed';
fireButton.style.bottom = '80px';
fireButton.style.left = '50%';
fireButton.style.transform = 'translateX(-50%)';
fireButton.style.zIndex = '3';
fireButton.onclick = () => {
    let event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2
    });
    document.dispatchEvent(event);
};
document.body.appendChild(fireButton);
