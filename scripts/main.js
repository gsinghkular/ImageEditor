const canvas = document.getElementById("img-canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let fileName = '';

const downloadBtn = document.getElementById("download-btn");
const uploadImg = document.getElementById("upload-img");
const resetBtn = document.getElementById("reset-btn");

// Upload file
uploadImg.addEventListener('change', e => {
    // Get file
    const file = document.getElementById("upload-img").files[0];

    // Init file reader
    const reader = new FileReader();

    if(file) {
        fileName = file.name;
        reader.readAsDataURL(file);
    }

    // add image to canvas
    reader.addEventListener('load', () => {
        img = new Image();
        img.src = reader.result;
        // On image load, add to canvas
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.removeAttribute('data-caman-id');
        }
    }, false);
});


// Effects
let currBrightness = 0;
let currContrast = 0;
let currVibrance = 0;
let currSaturation = 0;

function adjustBrightness(brightnessSlider) {
    var newBrightness = brightnessSlider.value;
    var toApply = newBrightness - currBrightness;
    Caman(canvas, function() {
        this.brightness(toApply).render();
    });
    currBrightness = newBrightness;
}

function adjustContrast(contrastSlider) {
    var newContrast = contrastSlider.value;
    var toApply = newContrast - currContrast;
    Caman(canvas, function() {
        this.contrast(toApply).render();
    });
    currContrast = newContrast;
}

function adjustVibrance(vibranceSlider) {
    var newVibrance = vibranceSlider.value;
    var toApply = newVibrance - currVibrance;
    Caman(canvas, function() {
        this.vibrance(toApply).render();
    });
    currVibrance = newVibrance;
}

function adjustSaturation(saturationSlider) {
    var newSaturation = saturationSlider.value;
    var toApply = newSaturation - currSaturation;
    Caman(canvas, function() {
        this.saturation(toApply).render();
    });
    currSaturation = newSaturation;
}