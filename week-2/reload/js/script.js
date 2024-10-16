// Add initial center image to ensure it stays at all times
let initialCenterImage = document.createElement('img');
initialCenterImage.src = 'images/aim.png'; // Replace with your image path
initialCenterImage.style.position = 'fixed';
initialCenterImage.style.left = '50%';
initialCenterImage.style.top = '50%';
initialCenterImage.style.transform = 'translate(-50%, -50%)';
initialCenterImage.style.zIndex = '1'; // Lower z-index to stay behind the clicked images
document.body.appendChild(initialCenterImage);

// Variables for ammo
let clipSize = 6;
let totalAmmo = 18;
let remainingAmmo = totalAmmo;
let currentClip = clipSize;

// Ammo display
let ammoDisplay = document.createElement('div');
ammoDisplay.style.position = 'fixed';
ammoDisplay.style.top = '10px';
ammoDisplay.style.left = '10px';
ammoDisplay.style.color = '#f59517';
ammoDisplay.style.fontFamily = '"Western", cursive';
ammoDisplay.style.fontSize = '24px';
ammoDisplay.style.zIndex = '4';
document.body.appendChild(ammoDisplay);
updateAmmoDisplay();

function updateAmmoDisplay() {
    ammoDisplay.innerHTML = `Ammo: ${currentClip} / ${remainingAmmo}`;
}

document.onclick = (event) => {
    if (!reloadButton.contains(event.target) && !fireButton.contains(event.target)) {
        if (currentClip > 0) {
            currentClip--;
            remainingAmmo--;
            updateAmmoDisplay();
            let audio = new Audio();
            audio.src = './sounds/shot.mp3';
            audio.autoplay = true;

            let img = document.createElement('img');
            img.src = 'images/flash.png';
            img.style.position = 'absolute';
            img.style.left = `${event.pageX}px`;
            img.style.top = `${event.pageY}px`;
            img.style.transform = 'translate(-50%, -50%) scale(0)';
            img.style.transition = 'transform 0.1s, opacity 0.15s';
            img.style.zIndex = '2';
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
        } else if (remainingAmmo > 0) {
            let audioEmpty = new Audio();
            audioEmpty.src = './sounds/emptyshot.wav';
            audioEmpty.autoplay = true;
        }
    }
};

document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyR' && currentClip < clipSize && remainingAmmo > 0) {
        let audio3 = new Audio();
        audio3.src = './sounds/reload.wav';
        audio3.autoplay = true;
        if (remainingAmmo >= clipSize) {
            currentClip = clipSize;
        } else {
            currentClip = remainingAmmo;
        }
        updateAmmoDisplay();
    }
});

// Create a "RELOAD" button
const reloadButton = document.createElement('button');
reloadButton.innerText = 'RELOAD';
reloadButton.style.position = 'fixed';
reloadButton.style.bottom = '20px';
reloadButton.style.left = '50%';
reloadButton.style.transform = 'translateX(-50%)';
reloadButton.style.zIndex = '3';
reloadButton.onclick = () => {
    let event = new KeyboardEvent('keydown', {'code': 'KeyR'});
    document.dispatchEvent(event);
};
document.body.appendChild(reloadButton);

// Create a "FIRE" button
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
