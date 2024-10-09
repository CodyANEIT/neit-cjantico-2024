document.onclick = (event) => {
    +document.querySelector('.patrons').value--;
    let audio = new Audio();
    audio.src = './sounds/shot.mp3';
    let audioEmpty = new Audio();
    audioEmpty.src = './sounds/emptyshot.wav';

    // When clicked a shot will be heard until count reaches 0 and will then play the empty shot
    if (document.querySelector('.patrons').value <= 5 && document.querySelector('.patrons').value >= 0) {
        audio.autoplay = true;
        audioEmpty.autoplay = false;
    } else {
        +document.querySelector('.patrons').value++;
        audioEmpty.autoplay = true;
        audio.autoplay = false;
    }

    // Display the image at the mouse cursor position with a zoom-in effect
    let img = document.createElement('img');
    img.src = 'images/flash.png';
    img.style.position = 'absolute';
    img.style.left = `${event.pageX}px`;
    img.style.top = `${event.pageY}px`;
    img.style.transform = 'translate(-50%, -50%) scale(0)';
    img.style.transition = 'transform 0.5s, opacity 1.5s';
    document.body.appendChild(img);

    // Trigger the zoom-in effect
    setTimeout(() => {
        img.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 0);

    // Fade out and remove the image after 1.5 seconds
    setTimeout(() => {
        img.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(img);
        }, 1500);
    }, 1500);
};

// When reloaded (R Press) the reloading effect will play as the count resets.
document.addEventListener('keydown', function(event) {
    let audio3 = new Audio();
    audio3.src = './sounds/reload.wav';

    if (event.code == 'KeyR' && document.querySelector('.patrons').value < 5) {
        audio3.autoplay = true;
        document.querySelector('.patrons').value = 5;
    } else {
        audio3.autoplay = false;
    }
});
