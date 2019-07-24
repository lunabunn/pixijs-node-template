# pixijs-node-template

`pixijs-node-template` is a PixiJS + Node project template that comes with PIXI initialization code, a static web server, and gamepad/keyboard input listeners. It is easy to use, without any Node dependencies.

PIXI initialization code can be found in `static/script.js`. Asset loading code and the static web server code can be found in `server.js`. Keyboard input can be accessed through the `keyDown[code]`, `keyPressed[code]`, and `keyReleased[code]` variables. Gamepad input can be accessed through the `gamepadButtonDown[button]`, `gamepadButtonPressed[button]`, `keyReleased[button]`, `gamepadAxes[axis]`, and `gamepadAxesPrev[axis]` variables, as well as through the `gamepads` array (which is an array of gamepad objects).

To write more code of your own, you can create new JS files and include them in `static/index.html`. Make sure the dependencies are loaded in first, and script.js is loaded in last. There is one JS file in `static/sources` already made for you, which is `static/sources/main.js`. `static/sources/main.js` contains two functions: `init()` and `process(delta)`. `init()` is run ONCE when the assets are loading and PIXI initialization is complete. `process(delta)` is run every frame thereafter (60 FPS).

If you have any questions, open an issue. If you notice any bugs or poorly written code, please feel free to open a pull request. `pixijs-node-template` is distributed under the ISC license; check `LICENSE` for more info.