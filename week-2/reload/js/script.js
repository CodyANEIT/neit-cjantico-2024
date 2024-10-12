// Add initial center image to ensure it stays at all times
let initialCenterImage = document.createElement('img');
initialCenterImage.src = 'images/aim.png'; // Replace with your image path
initialCenterImage.style.position = 'fixed';
initialCenterImage.style.left = '50%';
initialCenterImage.style.top = '50%';
initialCenterImage.style.transform = 'translate(-50%, -50%)';
initialCenterImage.style.zIndex = '1'; // Lower z-index to stay behind the clicked images
document.body.appendChild(initialCenterImage);

document.onclick = (event) => {
    // Check if the clicked element is not the reload button or fire button
    if (!reloadButton.contains(event.target) && !fireButton.contains(event.target)) {
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
            img.style.zIndex = '2'; // Higher z-index for clicked images
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
    }
};

// When reloaded (R Press) the reloading effect will play as the count resets.
document.addEventListener('keydown', function(event) {
    let audio3 = new Audio();
    audio3.src = './sounds/reload.wav';
    if (event.code === 'KeyR' && document.querySelector('.patrons').value < 5) {
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
reloadButton.style.zIndex = '3'; // Ensure the button is above other elements
reloadButton.onclick = () => {
    let event = new KeyboardEvent('keydown', {'code': 'KeyR'});
    document.dispatchEvent(event);
};
document.body.appendChild(reloadButton);

// Create a "FIRE" button
const fireButton = document.createElement('button');
fireButton.innerText = 'FIRE';
fireButton.style.position = 'fixed';
fireButton.style.bottom = '80px'; // Raised higher above the RELOAD button
fireButton.style.left = '50%';
fireButton.style.transform = 'translateX(-50%)';
fireButton.style.zIndex = '3'; // Ensure the button is above other elements
fireButton.onclick = () => {
    // Simulate a click in the center of the screen
    let event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2
    });
    document.dispatchEvent(event);
};
document.body.appendChild(fireButton);
