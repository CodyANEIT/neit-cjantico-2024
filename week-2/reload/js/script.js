document.onclick = (event) => {
    let patronsValue = +document.querySelector('.patrons').value--;
    let audio = new Audio();
    audio.src = './sounds/shot.mp3';
    let audioEmpty = new Audio();
    audioEmpty.src = './sounds/emptyshot.wav';

    if (patronsValue <= 5 && patronsValue > 0) {
        audio.autoplay = true;
        audioEmpty.autoplay = false;

        let img = document.createElement('img');
        img.src = 'images/flash.png';
        img.style.position = 'absolute';
        img.style.left = `${event.pageX}px`;
        img.style.top = `${event.pageY}px`;
        img.style.transform = 'translate(-50%, -50%) scale(0)';
        img.style.transition = 'transform 0.1s, opacity 0.15s';
        document.body.appendChild(img);

        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            img.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 0);

        setTimeout(() => {
            img.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(img);
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

// Create a "RELOAD" button
const reloadButton = document.createElement('button');
reloadButton.innerText = 'RELOAD';
reloadButton.style.position = 'fixed';
reloadButton.style.bottom = '20px';
reloadButton.style.left = '50%';
reloadButton.style.transform = 'translateX(-50%)';
reloadButton.style.display = 'none';
reloadButton.onclick = () => {
    let event = new KeyboardEvent('keydown', {'code': 'KeyR'});
    document.dispatchEvent(event);
};
document.body.appendChild(reloadButton);

// Show the button when patrons count is 0 and hide otherwise
const updateReloadButtonVisibility = () => {
    if (document.querySelector('.patrons').value == 0) {
        reloadButton.style.display = 'block';
    } else {
        reloadButton.style.display = 'none';
    }
};

// Attach to onchange event of the patrons input field
document.querySelector('.patrons').addEventListener('change', updateReloadButtonVisibility);

// Initial check to set the button visibility correctly on page load
updateReloadButtonVisibility();
