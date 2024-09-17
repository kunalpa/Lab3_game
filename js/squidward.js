class Squidward extends GameObject {
    constructor(canvas) {
        super('../resources/images/squid.png', canvas);
        this.x_next = 0;
        this.y_next = 0;
        this.speed = 5;
        this.keys = {};
        
        this.registerKeyEvents();
    }

    registerKeyEvents() {
        // callback events are called here
        window.addEventListener('keydown', (event) => this.keydown(event));
        window.addEventListener('keyup', (event) => this.keyup(event));
    }

    // callbacks are defined here
    keydown(e) {
        this.keys[e.key] = true;
    }
    keyup(e) {
        this.keys[e.key] = false;
    }

    // Asynchronously update position based on input
    async handleInput() {
        if (this.keys['ArrowUp']) {
            this.y_next = -this.speed;
        }
        if (this.keys['ArrowDown']) {
            this.y_next = this.speed;
        }
        if (this.keys['ArrowLeft']) {
            this.x_next = -this.speed;
        }
        if (this.keys['ArrowRight']) {
            this.x_next = this.speed;
        }
        // stop squidward if nothing is pressed
        if (!this.keys['ArrowUp'] && !this.keys['ArrowDown']) {
            this.y_next = 0;
        }
        if (!this.keys['ArrowLeft'] && !this.keys['ArrowRight']) {
            this.x_next = 0;
        }
        await this.updatePosition();
    }

    async updatePosition() {
        if (this.x + this.x_next >= 0 && this.x + this.x_next <= this.canvas.width - this.width) {
            this.x += this.x_next;
        }
        if (this.y + this.y_next >= 0 && this.y + this.y_next <= this.canvas.height - this.height) {
            this.y += this.y_next;
        }
    }

    setGame() {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;
    }


}