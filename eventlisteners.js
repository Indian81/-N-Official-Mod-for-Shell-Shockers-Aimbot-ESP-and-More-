unction updateESPLineColor() {
    for (let i = 0; i < ESPArray.length; i++) {
        const tracers = ESPArray[i][1];
        if (tracers) {
            tracers.color.r = espLineColor.r / 255;
            tracers.color.g = espLineColor.g / 255;
            tracers.color.b = espLineColor.b / 255;
        }
    }
}


// Modernized game settings object using ES6 class syntax
class GameSettings {
  constructor() {
    this._aimbotSensitivity = 5; // Default sensitivity
    this._aimbotFOV = 50; // Default FOV
  }

  // Getter for aimbot sensitivity
  get aimbotSensitivity() {
    return this._aimbotSensitivity;
  }

  // Setter for aimbot sensitivity
  set aimbotSensitivity(sensitivity) {
    this._aimbotSensitivity = sensitivity;
    console.log(`Aimbot sensitivity updated to: ${sensitivity}`);
    // Add logic to apply sensitivity in your game
  }

  // Getter for aimbot FOV
  get aimbotFOV() {
    return this._aimbotFOV;
  }

  // Setter for aimbot FOV
  set aimbotFOV(fov) {
    this._aimbotFOV = fov;
    console.log(`Aimbot FOV updated to: ${fov}`);
    // Add logic to apply FOV in your game
  }
}

// Create an instance of GameSettings
const gameSettings = new GameSettings();

// Function to update sensitivity settings in your game
const updateAimbotSensitivity = sensitivity => {
  gameSettings.aimbotSensitivity = sensitivity;
};

// Function to update FOV settings in your game
const updateAimbotFOV = fov => {
  gameSettings.aimbotFOV = fov;
};

// Event listeners for existing checkboxes and sliders
document.getElementById('espCheckbox').addEventListener('change', function() {
    espEnabled = this.checked;
});

document.getElementById('tracersCheckbox').addEventListener('change', function() {
    tracersEnabled = this.checked;
});

document.getElementById('rmbCheckbox').addEventListener('change', function() {
    rmbAimbot = this.checked;
});

document.getElementById('redSlider').addEventListener('input', function() {
    espColor.r = parseInt(this.value);
    document.getElementById('redValue').value = this.value;
    updateESPColor();
});

document.getElementById('greenSlider').addEventListener('input', function() {
    espColor.g = parseInt(this.value);
    document.getElementById('greenValue').value = this.value;
    updateESPColor();
});

document.getElementById('blueSlider').addEventListener('input', function() {
    espColor.b = parseInt(this.value);
    document.getElementById('blueValue').value = this.value;
    updateESPColor();
});

document.getElementById('espRedSlider').addEventListener('input', function() {
    espLineColor.r = parseInt(this.value);
    document.getElementById('espRedValue').value = this.value;
    updateESPLineColor();
});

document.getElementById('espGreenSlider').addEventListener('input', function() {
    espLineColor.g = parseInt(this.value);
    document.getElementById('espGreenValue').value = this.value;
    updateESPLineColor();
});

document.getElementById('espBlueSlider').addEventListener('input', function() {
    espLineColor.b = parseInt(this.value);
    document.getElementById('espBlueValue').value = this.value;
    updateESPLineColor();
});

document.getElementById('redValue').addEventListener('input', function() {
    espColor.r = parseInt(this.value);
    document.getElementById('redSlider').value = this.value;
    updateESPColor();
});

document.getElementById('greenValue').addEventListener('input', function() {
    espColor.g = parseInt(this.value);
    document.getElementById('greenSlider').value = this.value;
    updateESPColor();
});

document.getElementById('blueValue').addEventListener('input', function() {
    espColor.b = parseInt(this.value);
    document.getElementById('blueSlider').value = this.value;
    updateESPColor();
});

document.getElementById('espRedValue').addEventListener('input', function() {
    espLineColor.r = parseInt(this.value);
    document.getElementById('espRedSlider').value = this.value;
    updateESPLineColor();
});

document.getElementById('espGreenValue').addEventListener('input', function() {
    espLineColor.g = parseInt(this.value);
    document.getElementById('espGreenSlider').value = this.value;
    updateESPLineColor();
});

document.getElementById('espBlueValue').addEventListener('input', function() {
    espLineColor.b = parseInt(this.value);
    document.getElementById('espBlueSlider').value = this.value;
    updateESPLineColor();
});

document.getElementById('toggleGuiButton').addEventListener('click', function() {
    guiVisible = !guiVisible;
    document.getElementById('libertyMutualGui').style.display = guiVisible ? 'block' : 'none';

    const watermark = document.getElementById('watermark');
    if (guiVisible) {
        watermark.textContent = "TOGGLED GUI";
        watermark.style.display = 'block'; // Show watermark
    } else {
        watermark.style.display = 'none'; // Hide watermark
    }
});

// Event listeners for the new aimbot settings sliders
document.getElementById('aimbotSensitivity').addEventListener('input', function() {
  const sensitivity = parseInt(this.value);
  updateAimbotSensitivity(sensitivity);
});

document.getElementById('aimbotFOV').addEventListener('input', function() {
  const fov = parseInt(this.value);
  updateAimbotFOV(fov);
});


const toggleGuiButton = document.getElementById('toggleGuiButton');
toggleGuiButton.addEventListener('click', function() {
    guiVisible = !guiVisible;
    document.getElementById('libertyMutualGui').style.display = guiVisible ? 'block' : 'none';
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'h' || event.key === 'H') {
        guiVisible = !guiVisible;
        document.getElementById('libertyMutualGui').style.display = guiVisible ? 'block' : 'none';
    }

    if (event.key === 'v' || event.key === 'V') {
        enableESP = !enableESP;
        displayWatermark(`ESP ${enableESP ? "!Enabled!" : "!Disabled!"}`);
        console.log("ESP is now:", enableESP ? "enabled" : "disabled");
        espCheckbox.checked = enableESP;
    }

    if (event.key === 'n' || event.key === 'N') {
        enableTracers = !enableTracers;
        displayWatermark(`ESP Lines ${enableTracers ? "!Enabled!" : "!Disabled!"}`);
        console.log("ESP lines are now:", enableTracers ? "enabled" : "disabled");
        tracersCheckbox.checked = enableTracers;
    }

    if (event.key === 'c' || event.key === 'C') {
        RMB = !RMB;
        displayWatermark(` Aimbot ${RMB ? "Enabled" : "Disabled"}`);
        console.log(" (Aimbot) is now:", RMB ? "enabled" : "disabled");
        rmbCheckbox.checked = RMB;
    }
