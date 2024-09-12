class Model {
    constructor(canvas) {
        this.canvas = canvas;
        this.hearts = 3;
        this.squid;
        this.enemies = [];
        this.loadObjects();
        this.restartGame();
        this.loadImages();
        this.currentTime = 0;
        this.previousTime = 0;
        this.timeDelay = 200;
    }

    loadObjects() {
        this.squid = new Squidward(canvas);
        this.enemies.push(new Spongebob(canvas, this.squid));
        this.enemies.push(new Patrick(canvas, this.squid));
    }

    loadImages() {
        // will add to this next assignment
        this.heartImg = new Image();
        this.heartImg.src = '../assets/images/heart.png';
    }

    updatePositions() {
        // Update the positions of each enemy and adding a new enemy at a certain time interval
        this.currentTime++;
        if(this.currentTime-this.previousTime > this.timeDelay){
            this.previousTime = this.currentTime;
            if(Math.random() < 0.5) {
                this.enemies.push(new Spongebob(canvas, this.squid));
            } else {
                this.enemies.push(new Patrick(canvas, this.squid));
            }
            this.enemies[this.enemies.length-1].setGame();
        }
        
        // update each enemy's position
        for(let i=0; i < this.enemies.length; i++){
            this.enemies[i].updatePosition();
        }

        this.squid.updatePosition();

        // Check for collisions
        for(let i=0; i < this.enemies.length; i++){
            if(this.enemies[i].checkCollision(this.squid)) {
                this.hearts--;
                if (this.hearts <= 0) {
                    // Will change this in the future
                    // For now, just resets the hearts
                    this.restartGame();
                }
                this.resetGame();
            }
        }
    }

    resetGame() {
        this.currentTime = 0;
        this.previousTime = 0;
        this.squid.setGame();
        this.enemies = this.enemies.slice(0, 2);
        for(let i=0; i<this.enemies.length; i++){
            this.enemies[i].setGame();
            while (this.enemies[i].checkCollision(this.squid, 200) || this.enemies[i].x >= this.canvas.width - 90 || this.enemies[i].y >= this.canvas.height - 90) {
                this.enemies[i].setGame();
            }
        }
    }

    restartGame() {
        this.resetGame();
        this.hearts = 3;
    }

}