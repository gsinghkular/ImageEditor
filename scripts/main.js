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

    if (file) {
        fileName = file.name;
        reader.readAsDataURL(file);
    }

    // add image to canvas
    reader.addEventListener('load', () => {
        img = new Image();
        img.src = reader.result;
        // On image load, add to canvas
        img.onload = function () {
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

let brightnessSlider = document.getElementById("brightness");
let contrastSlider = document.getElementById("contrast");
let saturationSlider = document.getElementById("saturation");

brightnessSlider.addEventListener("change", () => {
    var newBrightness = brightnessSlider.value;
    var toApply = newBrightness - currBrightness;
    Caman(canvas, function () {
        this.brightness(toApply).render();
    });
    currBrightness = newBrightness;
})

contrastSlider.addEventListener("change", () => {
    var newContrast = contrastSlider.value;
    var toApply = newContrast - currContrast;
    Caman(canvas, function () {
        this.contrast(toApply).render();
    });
    currContrast = newContrast;
})

saturationSlider.addEventListener("change", () => {
    var newSaturation = saturationSlider.value;
    var toApply = newSaturation - currSaturation;
    Caman(canvas, function () {
        this.saturation(toApply).render();
    });
    currSaturation = newSaturation;
})


// Filters
document.getElementById("filters").addEventListener("click", (e) => {
    switch (event.target.id) {
        case "vintage":
            reset();
            Caman(canvas, function () {
                this.vintage().render();
            });
            break;
        case "lomo":
            reset();
            Caman(canvas, function () {
                this.lomo().render();
            });
            break;
        case "clarity":
            reset();
            Caman(canvas, function () {
                this.clarity().render();
            });
            break;
        case "nostalgia":
            reset();
            Caman(canvas, function () {
                this.nostalgia().render();
            });
            break;
    }
});

function reset() {
    brightnessSlider.value = 0;
    contrastSlider.value = 0;
    saturationSlider.value = 0;
    Caman(canvas, function () {
        this.revert();
    });
}


// Adjustments stuff
document.getElementById("adjustments").addEventListener("click", (e) => {
    switch (event.target.id) {
        case "rotate":
            Caman(canvas, function () {
                this.rotate(90).render();
            });
            break;
        case "flip-horizontal":
            Caman(canvas, function () {
                this.flipHorizontal().render();
            });
            break;
        case "flip-vertical":
            Caman(canvas, function () {
                this.flipVertical().render();
            });
            break;
    }
});


// add text

function addText() {
    ctx.font = "40pt Calibri";
    ctx.fillText("My TEXT!", canvas.height / 2, canvas.width/2, canvas.width);
}