    // Canvas setup
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 960;
    canvas.height = 540;

    // Load assets
    const playerImage = new Image();
    playerImage.src = "images/player.png";

    const badGuyImage = new Image();
    badGuyImage.src = "images/badguy.png";

    const background = new Image();
    background.src = "images/background.png";

    const sight = new Image();
    sight.src = "images/sight.png";

    // Game state variables
    let player = { x: canvas.width / 2, y: canvas.height / 2, size: 40, rotation: 0, health: 3 };
    let badGuys = [];
    let bullets = [];
    let score = 0;
    let gameRunning = false;
    let backgroundOffset = 0;

    // UI elements
    const playButton = document.getElementById("play-button");
    const retryButton = document.getElementById("retry-button");
    const mainMenu = document.getElementById("main-menu");
    const gameOverScreen = document.getElementById("game-over");
    const scoreDisplay = document.getElementById("score-display");
    const scoreBoard = document.getElementById("score");

    // Add event listeners for buttons
    playButton.addEventListener("click", startGame);
    retryButton.addEventListener("click", restartGame);

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

    // Player control
    window.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        const angle = Math.atan2(event.clientY - rect.top - player.y, event.clientX - rect.left - player.x);
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
                player.y = Math.max(player.y - 10, 20);
                break;
            case "s":
                player.y = Math.min(player.y + 10, canvas.height - 20);
                break;
            case "a":
                player.x = Math.max(player.x - 10, 20);
                break;
            case "d":
                player.x = Math.min(player.x + 10, canvas.width - 20);
                break;
        }
    });

    // Modify spawn function to include bad guy health
    function spawnBadGuy() {
        const x = Math.random() * canvas.width;
        const y = Math.random() < 0.5 ? -50 : canvas.height + 50;
        badGuys.push({ x, y, rotation: 0, health: 3 });
    }

    // Update bad guy behavior: rotating to face player and moving towards them
    function updateBadGuys() {
        for (let badGuy of badGuys) {
            // Calculate angle to face the player
            badGuy.rotation = Math.atan2(player.y - badGuy.y, player.x - badGuy.x);

            // Move towards the player
            const speed = 1.5;
            badGuy.x += Math.cos(badGuy.rotation) * speed;
            badGuy.y += Math.sin(badGuy.rotation) * speed;

            // Check for collision with player
            if (Math.hypot(player.x - badGuy.x, player.y - badGuy.y) < 20) {
                player.health--;
                badGuys.splice(badGuys.indexOf(badGuy), 1);
                if (player.health <= 0) endGame();
            }
        }
    }

    // Draw bad guys with rotation and health
    function drawBadGuys() {
        for (let badGuy of badGuys) {
            ctx.save();
            ctx.translate(badGuy.x, badGuy.y); // Move to bad guy's position
            ctx.rotate(badGuy.rotation); // Rotate to face the player
            ctx.drawImage(badGuyImage, -20, -20, 40, 40); // Adjust size and position
            ctx.restore();
        }
    }

    // Draw background
    function drawBackground() {
        backgroundOffset += 2;
        if (backgroundOffset > canvas.height) backgroundOffset = 0;

        ctx.drawImage(background, 0, backgroundOffset - canvas.height, canvas.width, canvas.height);
        ctx.drawImage(background, 0, backgroundOffset, canvas.width, canvas.height);
    }

    // Game loop
    function gameLoop() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBackground();
        updateBadGuys(); // Update bad guys' rotation and movement
        drawPlayer();
        drawBadGuys(); // Draw rotated bad guys
        drawBullets();

        requestAnimationFrame(gameLoop);
    }

    // Draw the player
    function drawPlayer() {
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.rotate(player.rotation);
        ctx.drawImage(playerImage, -player.size / 2, -player.size / 2, player.size, player.size);
        ctx.restore();
    }

    // Draw bullets
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

    // End game
    function endGame() {
        gameRunning = false;
        gameOverScreen.style.display = "block";
        scoreBoard.style.display = "none";
        scoreDisplay.innerText = `Score: ${score}`;
    }

    // Interval to spawn bad guys periodically
    setInterval(() => {
        if (gameRunning) spawnBadGuy();
    }, 1000);
