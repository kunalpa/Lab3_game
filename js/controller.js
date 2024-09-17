// utiltized following logic to decouple model and view and establish fixed-time step variable rendering
// https://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var lastFrameTimeMs = 0;
    // You can change maxFPS to simulate how the game will be played on weaker machines
    // The speed of the characters should remain the same, but the display may look more choppy
    var maxFPS = 30;
    var delta = 0;
    var timestep = 1000 / 60;

    const model = new Model(canvas);
    const view = new View(canvas);
    requestAnimationFrame(mainLoop);

    function mainLoop(timestamp) {
        // Throttle the frame rate.    
        if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
            requestAnimationFrame(mainLoop);
            return;
        }

        delta += timestamp - lastFrameTimeMs;
        lastFrameTimeMs = timestamp;

        while (delta >= timestep) {
            updateModel(timestep);
            delta -= timestep;
        }
        updateView(model);
        requestAnimationFrame(mainLoop);
        return;
    }

    function updateModel() {
        model.squid.handleInput();
        model.updatePositions();
    }

    function updateView(model) {
        view.render(model);
    }
}