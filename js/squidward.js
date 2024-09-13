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
        window.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });
    }

    // Asynchronously update position based on user input
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
        // No key pressed, reset movement
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
}