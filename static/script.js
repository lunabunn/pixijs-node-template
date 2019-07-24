/**
 * PIXI Settings
 */

// PIXI.settings.ROUND_PIXELS = true;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

/**
 * Create the Application
 */
var width = 480, height = 270; // The size of the Application
var app = new PIXI.Application({
    width: width,
    height: height
}); // Create the Application
document.body.appendChild(app.view); // Append the canvas to the <body>

/**
 * Variable Declarations (Global)
 */

var keyDown = {}, keyPressed = {}, keyReleased = {};
var gamepads = [], needsGamepadScan = false;
var gamepadButtonDown = {}, gamepadButtonPressed = {}, gamepadButtonReleased = {};
var gamepadAxes = [], gamepadAxesPrev = [];

/**
 * Function Declarations (Local)
 */

let load = function() {
    init();

    document.addEventListener('keydown', e => onKeyDown(e));
    document.addEventListener('keyup', e => onKeyUp(e));
    if (window.hasOwnProperty('ongamepadconnected')) {
        document.addEventListener('gamepadconnected', e => onGamepadConnected(e));
        document.addEventListener('gamepaddisconnected', e => onGamepadDisconnected(e));
    } else {
        needsGamepadScan = true;
    }

    app.ticker.add(delta => {
        updateGamepadInputs();
        process(delta);
        for (var key in keyPressed) {keyPressed[key] = false;}
        for (var key in keyReleased) {keyReleased[key] = false;}
        for (var button in gamepadButtonPressed) {gamepadButtonPressed[button] = false;}
        for (var button in gamepadButtonReleased) {gamepadButtonReleased[button] = false;}
        gamepadAxesPrev = gamepadAxes.slice();
    });
}

let onKeyDown = function (e) {
    if (!keyDown[e.code]) keyPressed[e.code] = true;
    keyDown[e.code] = true;
}

let onKeyUp = function (e) {
    keyReleased[e.code] = true;
    keyDown[e.code] = false;
}

let onGamepadConnected = function (e) {
    gamepads.push(e.gamepad);
}

let onGamepadDisconnected = function (e) {
    gamepads.remove(e.gamepad);
}

let updateGamepadInputs = function () {
    if (needsGamepadScan) {
        gamepads = [];
        for (var gamepad of (navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []))) {
            if (gamepad) {
                gamepads[gamepad.index] = gamepad;
            }
        }
    }

    if (gamepads.length < 1) {
        return;
    }

    var _gamepadButtonDown = [];
    for (var gamepad of gamepads) {
        for (var i=0; i<gamepad.buttons.length; i++) {
            _gamepadButtonDown[i] = _gamepadButtonDown[i] || gamepad.buttons[i].pressed;
        }
    }
    for (var i=0; i<_gamepadButtonDown.length; i++) {
        if (_gamepadButtonDown[i] && !gamepadButtonDown[i]) {
            gamepadButtonPressed[i] = true;
        } else if (gamepadButtonDown[i] && !_gamepadButtonDown[i]) {
            gamepadButtonReleased[i] = true;
        }
    }
    gamepadAxes = gamepads[0].axes;
    gamepadButtonDown = _gamepadButtonDown;
}

/**
 * Load assets
 */
for (var i=0; i<assets.length; i++) {
    PIXI.Loader.shared.add(assets[i]);
}
PIXI.Loader.shared.load(load);