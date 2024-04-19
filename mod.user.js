// ==UserScript==
// @name        ঔৣƗNĐƗȺ»Official Mod for Shell Shockers-Aimbot, ESP and More!
// @namespace  https://greasyfork.org/en/scripts/489957-%E0%A6%94%E0%A7%A3%C9%A8n%C4%91%C9%A8%E2%B1%A5-%C5%A7%C5%82%C7%A5%C9%87%C9%BD%E0%A6%94%E0%A7%A3-aimbot-for-shell-shockers/code
// @license      GPL-3.0
// @version      1.2.4pre3
// @author      onlypuppy7 and🔥ঔৣƗNĐƗȺ»ŦłǤɆⱤঔৣ🔥
// @description This userscript enhances the game Shell Shockers with ESP (Extra Sensory Perception), tracers, and aimbot features. It allows players to see opponents through walls, display lines to them, and automatically aim at targets. The script includes a GUI for toggling features and works on various Shell Shockers domains. Use of this script may violate game terms of service and ethical considerations.
// @match        *://algebra.best/*
// @match        *://algebra.vip/*
// @match        *://biologyclass.club/*
// @match        *://deadlyegg.com/*
// @match        *://deathegg.world/*
// @match        *://eggcombat.com/*
// @match        *://egg.dance/*
// @match        *://eggfacts.fun/*
// @match        *://egghead.institute/*
// @match        *://eggisthenewblack.com/*
// @match        *://eggsarecool.com/*
// @match        *://geometry.best/*
// @match        *://geometry.monster/*
// @match        *://geometry.pw/*
// @match        *://geometry.report/*
// @match        *://hardboiled.life/*
// @match        *://hardshell.life/*
// @match        *://humanorganising.org/*
// @match        *://mathdrills.info/*
// @match        *://mathfun.rocks/*
// @match        *://mathgames.world/*
// @match        *://math.international/*
// @match        *://mathlete.fun/*
// @match        *://mathlete.pro/*
// @match        *://overeasy.club/*
// @match        *://scrambled.best/*
// @match        *://scrambled.tech/*
// @match        *://scrambled.today/*
// @match        *://scrambled.us/*
// @match        *://scrambled.world/*
// @match        *://shellshockers.club/*
// @match        *://shellshockers.site/*
// @match        *://shellshockers.us/*
// @match        *://shellshockers.world/*
// @match        *://softboiled.club/*
// @match        *://violentegg.club/*
// @match        *://violentegg.fun/*
// @match        *://yolk.best/*
// @match        *://yolk.life/*
// @match        *://yolk.rocks/*
// @match        *://yolk.tech/*
// @match        *://shellshock.io/*
// @match        *://zygote.cafe/*
// @discord      https://discord.gg/XYb6hVsEEA/*
// @homepage   https://greasyfork.org/en/scripts/492659/
// @greasyfork  https://greasyfork.org/en/users/1228152-%E0%A6%94%E0%A7%A3%C9%A8-%E2%86%81%C9%A8%E2%B1%A5%E0%A6%94%E0%A7%A3/
// @grant        none
// @run-at       document-start
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @require      https://cdn.jsdelivr.net/npm/babylonjs@3.3.0/babylon.min.js
// ==/UserScript==
 
(function () {
    let originalReplace = String.prototype.replace;
    String.prototype.originalReplace = function() {
        return originalReplace.apply(this, arguments);
    };
 
    let enableESP = true;
    let enableTracers = true;
    let RMB = false;
 
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRGetResponse = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'response');
    let shellshockjs;
    XMLHttpRequest.prototype.open = function(...args) {
        const url = args[1];
        if (url && url.includes("js/shellshock.js")) {
            shellshockjs = this;
        }
        originalXHROpen.apply(this, args);
    };
    Object.defineProperty(XMLHttpRequest.prototype, 'response', {
        get: function() {
            if (this === shellshockjs) {
                return applyLibertyMutual(originalXHRGetResponse.get.call(this));
            }
            return originalXHRGetResponse.get.call(this);
        }
    });
 
    let F = [];
    let H = {};
    let functionNames = [];
    let ESPArray = [];
 
    const getScrambled = function() {
        return Array.from({length: 10}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
    };
 
    const createAnonFunction = function(name, func) {
        const funcName = getScrambled();
        window[funcName] = func;
        F[name] = window[funcName];
        functionNames[name] = funcName;
    };
 
    const fetchTextContent = function(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false); // Make the request synchronous
        xhr.send();
        if (xhr.status === 200) {
            return xhr.responseText;
        } else {
            console.error("Error fetching text content. Status:", xhr.status);
            return null;
        }
    };
 
    const applyLibertyMutual = function(js) {
        let hash = CryptoJS.SHA256(js).toString(CryptoJS.enc.Hex);
        let clientKeys;
        onlineClientKeys = fetchTextContent("https://raw.githubusercontent.com/StateFarmNetwork/client-keys/main/libertymutual_" + hash + ".json");
 
        if (onlineClientKeys == "value_undefined" || onlineClientKeys == null) {
            let userInput = prompt('Valid keys could not be retrieved online. Enter keys if you have them. Join the StateFarm Network Discord server to generate keys! https://discord.gg/HYJG3jXVJF', '');
            if (userInput !== null && userInput !== '') {
                alert('Aight, let\'s try this. If it is invalid, it will just crash.');
                clientKeys = JSON.parse(userInput);
            } else {
                alert('You did not enter anything, this is gonna crash (LMFAO).');
            }
        } else {
            clientKeys = JSON.parse(onlineClientKeys);
        }
 
        H = clientKeys.vars;
 
        let injectionString = "";
 
        const modifyJS = function(find,replace) {
            let oldJS = js;
            js = js.originalReplace(find,replace);
            if (oldJS !== js) {
                console.log("%cReplacement successful! Injected code: "+replace, 'color: green; font-weight: bold; font-size: 0.6em; text-decoration: italic;');
            } else {
                console.log("%cReplacement failed! Attempted to replace "+find+" with: "+replace, 'color: red; font-weight: bold; font-size: 0.6em; text-decoration: italic;');
            }
        };
 
        console.log('%cATTEMPTING TO START LIBERTYMUTUAL', 'color: magenta; font-weight: bold; font-size: 1.5em; text-decoration: underline;');
        const variableNameRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
        for (let name in H) {
            deobf = H[name];
            if (variableNameRegex.test(deobf)) {
                injectionString = `${injectionString}${name}: (() => { try { return ${deobf}; } catch (error) { return "value_undefined"; } })(),`;
            } else {
                alert("Message from the LibertyMutual Devs: WARNING! The keys inputted contain non-variable characters! There is a possibility that this could run code unintended by the LibertyMutual team, although possibly there is also a mistake. Do NOT proceed with using this, and report to the LibertyMutual developers what is printed in the console.");
                console.log("REPORT THIS IN THE DISCORD SERVER:", clientKeys);
                const crashplease = "balls";
                crashplease = "balls2";
            }
        }
        console.log(injectionString);
        console.log('%cLIBERTYMUTUAL INJECTION: INJECT VAR RETRIEVAL FUNCTION AND MAIN LOOP', 'color: yellow; font-weight: bold; font-size: 1.2em; text-decoration: underline;');
        modifyJS(H.SCENE+'.render',`window["${functionNames.retrieveFunctions}"]({${injectionString}},true)||${H.SCENE}.render`);
        console.log('%cSuccess! Variable retrieval and main loop hooked.', 'color: green; font-weight: bold;');
        modifyJS(`{if(${H.CULL})`,`{if(true)`);
        console.log('%cSuccess! Cull inhibition hooked.', 'color: green; font-weight: bold;');
        modifyJS("Not playing in iframe", "LIBERTYMUTUAL ACTIVE!");
        console.log(H);
        return js;
    };
 
    createAnonFunction("retrieveFunctions", function(vars) {
        ss = vars;
        F.LIBERTYMUTUAL();
    });
 
    createAnonFunction("LIBERTYMUTUAL", function() {
        ss.PLAYERS.forEach(PLAYER=>{
            if (PLAYER.hasOwnProperty("ws")) {
                ss.MYPLAYER = PLAYER;
            }
        });
 
        H.actor = findKeyWithProperty(ss.MYPLAYER,H.mesh);
 
        let TARGETED;
        let CROSSHAIRS = new BABYLON.Vector3();
        CROSSHAIRS.copyFrom(ss.MYPLAYER[H.actor][H.mesh].position);
        const horizontalOffset = Math.sin(ss.MYPLAYER[H.actor][H.mesh].rotation.y);
        const verticalOffset = Math.sin(-ss.MYPLAYER[H.pitch]);
        CROSSHAIRS.x += horizontalOffset;
        CROSSHAIRS.y += verticalOffset + 0.4;
        CROSSHAIRS.z += Math.cos(ss.MYPLAYER[H.actor][H.mesh].rotation.y);
 
        const timecode = Date.now();
        let minValue = 99999;
        ss.PLAYERS.forEach(PLAYER=>{
            if (PLAYER) {
                PLAYER.timecode = timecode;
                if ((PLAYER!==ss.MYPLAYER) && ((ss.MYPLAYER.team==0)||(PLAYER.team!==ss.MYPLAYER.team))) {
                    if ((!PLAYER.generatedESP)) {
                        const boxSize = {width: 0.4, height: 0.65, depth: 0.4};
                        const vertices = [
                            new BABYLON.Vector3(-boxSize.width / 2, 0, -boxSize.depth / 2),
                            new BABYLON.Vector3(boxSize.width / 2, 0, -boxSize.depth / 2),
                            new BABYLON.Vector3(boxSize.width / 2, 0 + boxSize.height, -boxSize.depth / 2),
                            new BABYLON.Vector3(-boxSize.width / 2, 0 + boxSize.height, -boxSize.depth / 2),
                            new BABYLON.Vector3(-boxSize.width / 2, 0, boxSize.depth / 2),
                            new BABYLON.Vector3(boxSize.width / 2, 0, boxSize.depth / 2),
                            new BABYLON.Vector3(boxSize.width / 2, 0 + boxSize.height, boxSize.depth / 2),
                            new BABYLON.Vector3(-boxSize.width / 2, 0 + boxSize.height, boxSize.depth / 2),
                        ];
                        const lines = [];
                        for (let i = 0; i < 4; i++) {
                            lines.push([vertices[i], vertices[(i + 1) % 4]]);
                            lines.push([vertices[i + 4], vertices[(i + 1) % 4 + 4]]);
                            lines.push([vertices[i], vertices[i + 4]]);
                        }
                        const box = BABYLON.MeshBuilder.CreateLineSystem(getScrambled(), { lines }, PLAYER[H.actor].scene);
                        box.renderingGroupId = 1;
                        box.parent = PLAYER[H.actor][H.mesh];
                        const tracers = BABYLON.MeshBuilder.CreateLines('lines', { points: [PLAYER[H.actor][H.mesh].position, CROSSHAIRS] }, PLAYER[H.actor].scene);
                        tracers.alwaysSelectAsActiveMesh = true;
                        tracers.renderingGroupId = 1;
 
                        PLAYER.box = box;
                        PLAYER.tracers = tracers;
                        PLAYER.generatedESP = true;
                        ESPArray.push([box, tracers, PLAYER]);
                    }
                    PLAYER.tracers.setVerticesData(BABYLON.VertexBuffer.PositionKind, [CROSSHAIRS.x, CROSSHAIRS.y, CROSSHAIRS.z, PLAYER[H.actor][H.mesh].position.x, PLAYER[H.actor][H.mesh].position.y, PLAYER[H.actor][H.mesh].position.z]);
                    PLAYER.box.visibility = enableESP;
                    PLAYER.tracers.visibility = (PLAYER[H.playing] && enableTracers);
 
                    const distance = Math.hypot(PLAYER[H.x]-ss.MYPLAYER[H.x], PLAYER[H.y]-ss.MYPLAYER[H.y], PLAYER[H.z]-ss.MYPLAYER[H.z]);
 
                    if (distance < minValue) {
                        TARGETED = PLAYER;
                        minValue = distance;
                    }
                }
            }
            if (RMB && TARGETED && TARGETED[H.playing]) {
                const directionVector={
                    [H.x]: TARGETED[H.x]-ss.MYPLAYER[H.x],
                    [H.y]: TARGETED[H.y]-ss.MYPLAYER[H.y]-0.05,
                    [H.z]: TARGETED[H.z]-ss.MYPLAYER[H.z],
                };
                ss.MYPLAYER[H.yaw]=F.calculateYaw(directionVector);
                ss.MYPLAYER[H.pitch]=F.calculatePitch(directionVector);
            }
        });
        for ( let i=0;i<ESPArray.length;i++) {
            if (ESPArray[i][2] && ESPArray[i][2].timecode==timecode) {
            } else {
                ESPArray[i][0].dispose();
                ESPArray[i][1].dispose();
                ESPArray.splice(i,1);
            }
        }
    });
 
    createAnonFunction("setPrecision", function (value) {
        return Math.floor(value * 8192) / 8192;
    });
 
    createAnonFunction("calculateYaw", function (pos) {
        return F.setPrecision(Math.mod(Math.atan2(pos[H.x],pos[H.z]), Math.PI2));
    });
 
    createAnonFunction("calculatePitch", function (pos) {
        return F.setPrecision(-Math.atan2(pos[H.y],Math.hypot(pos[H.x],pos[H.z]))%1.5);
    });
 
    let guiVisible = true;
    let espColor = { r: 255, g: 255, b: 255 };
 
    const findKeyWithProperty = function(obj, propertyToFind) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key === propertyToFind) {
                    return [key];
                } else if (
                    typeof obj[key] === 'object' &&
                    obj[key] !== null &&
                    obj[key].hasOwnProperty(propertyToFind)
                ) {
                    return key;
                }
            }
        }
        return null;
    };
 
    const guiHtml = `
        <style>
             #libertyMutualGui {
                position: fixed;
                top: 20px;
                left: 20px;
                background-color: rgba(0, 0, 0, 0.7);
                padding: 10px;
                border: 4px solid black;
                border-radius: 5px;
                z-index: 9999;
                font-family: 'Agency FB', sans-serif;
                font-style: italic;
                font-weight: bold;
                font-size: 10px;
 
            }
            #libertyMutualGui input[type="range"] {
                width: 100px;
                margin-bottom: 5px;
            }
            #toggleGuiButton {
                margin-top: 5px;
                padding: 5px;
                cursor: pointer;
 
            input[type="range"] {
        background: linear-gradient(to right, red 0%, red 100%);
 
            }
</style>
<div id="libertyMutualGui" style="font-family: 'Agency FB', sans-serif; padding: 14px; border: 2px solid red; border-radius: 5px; position: fixed; top: 20px; left: 20px; z-index: 9999;">
    <div>
      <h3 style="color: #FF0000; text-align: center;">Settings</h3>
        <input type="checkbox" id="espCheckbox" checked> <span style="color: red;">ESP</span> [V]<br>
        <input type="checkbox" id="tracersCheckbox" checked> <span style="color: red;">TRACERS</span> [N]<br>
        <input type="checkbox" id="rmbCheckbox"> <span style="color: red;">Aimbot</span>[C]<br>
        <br>
        <div>
            <input type="range" id="redSlider" min="0" max="255" value="255">
            <input type="number" id="redValue" min="0" max="255" value="255">
            <span style="color: red;">ESP RED</span>
            <br>
            <input type="range" id="greenSlider" min="0" max="255" value="255">
            <input type="number" id="greenValue" min="0" max="255" value="255">
            <span style="color: red;">ESP GREEN</span>
            <br>
            <input type="range" id="blueSlider" min="0" max="255" value="255">
            <input type="number" id="blueValue" min="0" max="255" value="255">
            <span style="color: red;">ESP BLUE</span>
            <br>
            <br>
            <input type="range" id="espRedSlider" min="0" max="255" value="255">
            <input type="number" id="espRedValue" min="0" max="255" value="255">
            <span style="color: red;">TRACERS RED</span>
            <br>
            <input type="range" id="espGreenSlider" min="0" max="255" value="255">
            <input type="number" id="espGreenValue" min="0" max="255" value="255">
            <span style="color: red;">TRACERS GREEN</span>
            <br>
            <input type="range" id="espBlueSlider" min="0" max="255" value="255">
            <input type="number" id="espBlueValue" min="0" max="255" value="255">
            <span style="color: red;">TRACERS BLUE</span>
        </div>
        <!-- Aimbot Settings -->
        <h3>Aimbot Settings</h3>
        <label for="aimbotSensitivity">Aimbot Sensitivity:</label>
        <input type="range" id="aimbotSensitivity" min="1" max="10" value="5">
        <span id="aimbotSensitivityValue">5</span><br>
        <label for="aimbotFOV">Aimbot FOV:</label>
        <input type="range" id="aimbotFOV" min="1" max="100" value="50">
        <span id="aimbotFOVValue">50</span><br>
        <div>
        <h3>Links</h3>
        <div>
            <a href="https://greasyfork.org/en/users/1228152-%E0%A6%94%E0%A7%A3%C9%A8n%C4%91%C9%A8%E2%B1%A5%E0%A6%94%E0%A7%A3">Author's Page</a>
        <div>
            <a href="https://greasyfork.org/en/scripts/492659">Homepage</a>
        </div>
           <a href="https://discord.gg/R5rv9etva9">Discord</a>
    </div>
    <button id="toggleGuiButton">Toggle GUI (H)</button>
</div>
    `;
 
    document.body.insertAdjacentHTML('beforeend', guiHtml);
    let espLineColor = { r: 255, g: 255, b: 255 };
 
function updateESPLineColor() {
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
 
 function displayWatermark(text) {
    const watermark = document.createElement('div');
    watermark.textContent = text;
    watermark.style.position = 'fixed';
    watermark.style.bottom = '10px';
    watermark.style.left = '10px';
    watermark.style.padding = '5px 10px';
    watermark.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    watermark.style.color = 'red';
    watermark.style.borderRadius = '3px';
    watermark.style.zIndex = '9999';
    watermark.style.fontFamily = 'Agency FB, italic, sans-serif';
    watermark.style.fontSize = '18px';
    watermark.style.fontWeight = 'bold';
    watermark.style.textTransform = 'uppercase';
    watermark.style.transition = 'transform 1s linear, left 1s ease-in-out';
    watermark.style.border = '2px solid #ff0000'; // Red border, 2px width
    document.body.appendChild(watermark);
 
    void watermark.offsetWidth;
 
    setTimeout(function() {
        watermark.style.opacity = '0';
        setTimeout(function() {
            watermark.remove();
        }, 2000);
    }, 2000);
}
});
 
    function updateESPColor() {
        for (let i = 0; i < ESPArray.length; i++) {
            const box = ESPArray[i][0];
            if (box) {
                box.color.r = espColor.r / 255;
                box.color.g = espColor.g / 255;
                box.color.b = espColor.b / 255;
            }
        }
    }
})();
