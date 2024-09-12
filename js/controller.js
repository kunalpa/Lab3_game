window.onload = function () {
    var canvas = document.getElementById("canvas");

    const model = new Model(canvas);
    const view = new View(canvas);
    requestAnimationFrame(mainLoop);

    function mainLoop() {
        update_model();
        update_view(model);
        requestAnimationFrame(mainLoop);
    }

    function update_model() {
        model.updatePositions();
    }

    function update_view(model) {
        view.render(model);
    }
}