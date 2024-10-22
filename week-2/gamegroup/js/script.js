let clipSize = 6;
let totalAmmo = 18;
let currentClip = clipSize;
let remainingAmmo = totalAmmo - clipSize; // Ammo left after initial clip
let score = 0; // Score variable
let gameActive = false; // Game state
let timer; // Timer variable
let highScore = 0; // High score variable

// Create the ammo display
let ammoDisplay = document.createElement('div');
ammoDisplay.className = 'display ammoDisplay';
document.body.appendChild(ammoDisplay);
updateAmmoDisplay();

// Create the score display
let scoreDisplay = document.createElement('div');
scoreDisplay.className = 'display scoreDisplay';
document.body.appendChild(scoreDisplay);
updateScoreDisplay();

// Create the timer display
let timerDisplay = document.createElement('div');
timerDisplay.className = 'display timerDisplay';
document.body.appendChild(timerDisplay);
updateTimerDisplay(60);

// Function to update the ammo display
function updateAmmoDisplay() {
    ammoDisplay.innerHTML = `Ammo: ${currentClip} / ${remainingAmmo}`;
}

// Function to update the score display
function updateScoreDisplay() {
    scoreDisplay.innerHTML = `Score: ${score}`;
}

// Function to update the timer display
function updateTimerDisplay(time) {
    timerDisplay.innerHTML = `Time: ${time}`;
}

// Function to start the game
function startGame() {
    score = 0;
    currentClip = clipSize;
    remainingAmmo = totalAmmo - clipSize;
    gameActive = true;
    updateAmmoDisplay();
    updateScoreDisplay();
    startTimer(60); // Start 60 seconds timer
    spawnTarget(); // Start spawning targets
}

// Function to start the timer
function startTimer(duration) {
    let timeRemaining = duration;
    updateTimerDisplay(timeRemaining);
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay(timeRemaining);
        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// Function to end the game
function endGame() {
    gameActive = false;
    clearInterval(timer);
    if (score > highScore) {
        highScore = score; // Update high score
    }
    displayEndScreen();
}

// Function to display the end screen
function displayEndScreen() {
    const endScreen = document.createElement('div');
    endScreen.style.position = 'fixed';
    endScreen.style.top = '50%';
    endScreen.style.left = '50%';
    endScreen.style.transform = 'translate(-50%, -50%)';
    endScreen.style.color = '#f59517';
    endScreen.style.fontFamily = '"Western", cursive';
    endScreen.style.fontSize = '36px';
    endScreen.style.zIndex = '5';
    endScreen.innerHTML = `Game Over!<br>Score: ${score}<br>High Score: ${highScore}<br><button id="restartButton" class="game-button">Restart</button>`;
    document.body.appendChild(endScreen);

    document.getElementById('restartButton').onclick = () => {
        document.body.removeChild(endScreen);
        startGame();
    };
}

// Function to spawn targets
function spawnTarget() {
    if (!gameActive) return;

    const target = document.createElement('img');
    target.src = 'images/aim.png'; // Regular target image
    target.style.position = 'absolute';
    target.style.width = '50px';
    target.style.height = '50px';
    target.style.zIndex = '3';
    target.style.left = Math.random() * window.innerWidth + 'px';
    target.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(target);

    target.onclick = () => {
        if (!gameActive) return;
        score += 50; // Regular target score
        updateScoreDisplay();
        currentClip = Math.min(currentClip + 6, clipSize); // Reload ammo
        remainingAmmo = Math.max(remainingAmmo - 6, 0); // Adjust remaining ammo
        updateAmmoDisplay();
        document.body.removeChild(target);
        spawnTarget(); // Spawn next target
    };

    // Random chance for a special target
    if (Math.random() < 0.1) { // 10% chance for special target
        target.src = 'images/aim2.png'; // Special target image
        target.onclick = () => {
            if (!gameActive) return;
            score += 100; // Special target score
            updateScoreDisplay();
            currentClip = Math.min(currentClip + 6, clipSize); // Reload ammo
            remainingAmmo = Math.max(remainingAmmo - 6, 0); // Adjust remaining ammo
            updateAmmoDisplay();
            document.body.removeChild(target);
            spawnTarget(); // Spawn next target
        };
    }

    // Move the target randomly
    setTimeout(() => {
        if (document.body.contains(target)) {
            target.style.left = Math.random() * window.innerWidth + 'px';
            target.style.top = Math.random() * window.innerHeight + 'px';
            spawnTarget(); // Continuously spawn new targets
        }
    }, 2000); // Adjust this value for target movement frequency
}

// Button to start the game
const startButton = document.createElement('button');
startButton.innerText = 'START GAME';
startButton.className = 'game-button';
startButton.style.position = 'fixed';
startButton.style.bottom = '20px';
startButton.style.left = '50%';
startButton.style.transform = 'translateX(-50%)';
startButton.style.zIndex = '3';
startButton.onclick = startGame;
document.body.appendChild(startButton);
