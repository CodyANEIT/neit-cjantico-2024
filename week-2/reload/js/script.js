document.onclick = (event) => {
    let patronsValue = +document.querySelector('.patrons').value--;
    let audio = new Audio();
    audio.src = './sounds/shot.mp3';
    let audioEmpty = new Audio();
    audioEmpty.src = './sounds/emptyshot.wav';

    // When clicked a shot will be heard until count reaches 0 and will then play the empty shot
    if (patronsValue <= 5 && patronsValue > 0) {
        audio.autoplay = true;
        audioEmpty.autoplay = false;

        // Display the image at the mouse cursor position with a fast zoom-in effect
        let img = document.createElement('img');
        img.src = 'images/flash.png'; // Replace with your image path
        img.style.position = 'absolute';
        img.style.left = `${event.pageX}px`;
        img.style.top = `${event.pageY}px`;
        img.style.transform = 'translate(-50%, -50%) scale(0)';
        img.style.transition = 'transform 0.1s, opacity 0.15s';
        document.body.appendChild(img);

        // Hide overflow to prevent scroll bars
        document.body.style.overflow = 'hidden';

        // Trigger the zoom-in effect
        setTimeout(() => {
            img.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 0);

        // Fade out and remove the image after 0.15 seconds
        setTimeout(() => {
            img.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(img);
                // Restore overflow after removing the image
                document.body.style.overflow = '';
            }, 150);
        }, 150);

    } else {
        document.querySelector('.patrons').value++;
        audioEmpty.autoplay = true;
        audio.autoplay = false;
    }
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
