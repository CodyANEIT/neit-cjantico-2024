/*-------------------------------------------
Game Setup
-------------------------------------------*/
var c = document.querySelector(`canvas`);
var ctx = c.getContext(`2d`);
var fps = 1000 / 60;
var timer;

/*-------------INSTRUCTION--------------
Create variable called score to store amount of "pickups" collected
---------------------------------------*/
var score = 0;  // Score variable to track collected pickups
var totalPickups = 50;  // Total number of pickups, including testPickup

/*--------------Load Player Image (avatar)------------*/
var avatarImg = new Image();
avatarImg.src = 'images/mrt.jpg';  // Image source for the avatar

// Wait for the image to load before starting the game
avatarImg.onload = function() {
    timer = setInterval(main, fps);  // Start the game only after the image is loaded
};

/*--------------avatar------------*/
var avatar = new GameObject();
avatar.w = 100;  // Set avatar width to 100px
avatar.h = 100;  // Set avatar height to 100px
avatar.vx = 2;
avatar.vy = 2;

/*--------------testPickup------------*/
var testPickup = new GameObject();
testPickup.x = 100;
testPickup.y = 100;
testPickup.w = 18;
testPickup.h = 18;
testPickup.color = `#2244ff`;  // Blue pickup

/*--------------powerups------------*/
var amt = 49;  // 49 yellow pickups, plus 1 testPickup to make 50 total
var pickups = [];

for (var i = 0; i < amt; i++) {
    pickups[i] = new GameObject();
    pickups[i].color = `#ffff00`;  // Yellow pickups
    pickups[i].w = 18;
    pickups[i].h = 18;
    pickups[i].x = rand(0, c.width);
    pickups[i].y = rand(0, c.height);

    while (pickups[i].overlaps(avatar)) {
        if (pickups[i].x < avatar.x) {
            pickups[i].x -= 1;
        }
        if (pickups[i].x >= avatar.x) {
            pickups[i].x++;
        }
    }
}

/*--------------main()------------------------*/
function main() {
    ctx.clearRect(0, 0, c.width, c.height);

    // Avatar movement
    if (d == true) { avatar.x += avatar.vx; }
    if (a == true) { avatar.x += -avatar.vx; }
    if (w == true) { avatar.y += -avatar.vy; }
    if (s == true) { avatar.y += avatar.vy; }

    // Keeps avatar on screen
    if (avatar.x < 0 + avatar.w / 2) { avatar.x = 0 + avatar.w / 2; }
    if (avatar.x > c.width - avatar.w / 2) { avatar.x = c.width - avatar.w / 2; }
    if (avatar.y < 0 + avatar.h / 2) { avatar.y = 0 + avatar.h / 2; }
    if (avatar.y > c.height - avatar.h / 2) { avatar.y = c.height - avatar.h / 2; }

    // TestPickup collision
    if (testPickup.overlaps(avatar)) {
        testPickup.x = 1000;  // Move testPickup off-screen
        score++;  // Increase the score when testPickup is collected
    }

    // Pickup collection
    for (var i = 0; i < pickups.length; i++) {
        if (pickups[i].overlaps(avatar)) {
            pickups[i].x = -1000;  // Move pickup off-screen
            score++;  // Increase the score for each pickup
        }
        pickups[i].render();
    }

    testPickup.render();

    // Render the avatar as an image
    ctx.drawImage(avatarImg, avatar.x - avatar.w / 2, avatar.y - avatar.h / 2, avatar.w, avatar.h);

    /*--------------text----------------*/
    ctx.textAlign = `center`;
    ctx.font = '64px Arial';
    ctx.fillStyle = 'black';  // Text color
    ctx.fillText("Score: " + score, c.width / 2, 100);  // Display score

    // Check if player has collected all 50 pickups (including testPickup) and won
    if (score >= totalPickups) {
        alert("Congratulations! You collected all 50 pickups and won the game!");
        clearInterval(timer);  // Stop the game loop
    }
}

/*--- Display Console Message ---*/
console.log("I pity the fool that checks the console!");

// Random number generator
function rand(_low, _high) {
    return Math.random() * (_high - _low) + _low;
}
