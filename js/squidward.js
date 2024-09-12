class Squidward extends GameObject {
    constructor(canvas) {
        super('../assets/images/squid.png', canvas);
        this.x_next = 0;
        this.y_next = 0;
        this.speed = 5;
    }

    setGame() {
        this.x = Math.floor(this.canvas.width / 2);
        this.y = Math.floor(this.canvas.height / 2);
        var dx = Math.max(5e-300, Math.random());
        var dy = Math.max(5e-300, Math.random());
        var angle = Math.atan(dy/dx);
        this.x_next = Math.cos(angle) * this.speed;
        this.y_next = Math.sin(angle) * this.speed;

    }

    updatePosition() {
        // will change this in the game
        if(this.x + this.x_next >= this.canvas.width - 90 || this.x + this.x_next < 0) {
            this.x_next = -this.x_next;
        }
        if(this.y + this.y_next >= this.canvas.height - 90 || this.y + this.y_next < 0) {
            this.y_next = -this.y_next;
        }
        this.x += this.x_next;
        this.y += this.y_next;
    }
}