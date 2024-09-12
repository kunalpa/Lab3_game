class Model {
    constructor(canvas) {
        this.canvas = canvas;
        this.hearts = 3;
        this.squid;
        this.enemies = [];
        this.currentTime = 0;
        this.previousTime = 0;
        this.timeDelay = 200;  // delay before new enemies are added
        this.gameOver = false;
        this.highScore = 0;
        this.loadObjects();
        this.restartGame();
        this.loadImages();

        this.restartButton = document.getElementById("restartButton");
        this.scoreDisplay;
        this.highScoreDisplay;
        this.setupRestartButton();
    }

    setupRestartButton() {
        this.restartButton.addEventListener('click', () => {
            this.restartGame();
            this.hideRestartButton();
        });
    }

    showRestartButton() {
        this.restartButton.style.display = "block";
    }

    hideRestartButton() {
        this.restartButton.style.display = "none";
    }

    loadObjects() {
        this.squid = new Squidward(this.canvas);
        this.enemies.push(new Spongebob(this.canvas, this.squid));
        this.enemies.push(new Patrick(this.canvas, this.squid));
    }

    loadImages() {
        this.heartImg = new Image();
        this.heartImg.src = '../assets/images/heart.png';
    }

    updatePositions() {
        if (this.gameOver) {
            return;
        }

        this.currentTime++;
        this.updateScoreDisplay();

        if (this.currentTime - this.previousTime > this.timeDelay) {
            this.previousTime = this.currentTime;
            if (Math.random() < 0.5) {
                this.enemies.push(new Spongebob(this.canvas, this.squid));
            } else {
                this.enemies.push(new Patrick(this.canvas, this.squid));
            }
            this.enemies[this.enemies.length - 1].setGame();
        }

        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].updatePosition();
        }

        this.squid.updatePosition();

        // Check for collisions
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].checkCollision(this.squid)) {
                this.hearts--;
                if (this.hearts <= 0) {
                    this.gameOver = true;
                    this.showRestartButton();
                    return;
                }
                this.resetGame();
            }
        }
    }

    updateScoreDisplay() {
        if (this.scoreDisplay == null) {
            this.scoreDisplay = document.getElementById('scoreDisplay');
        }
        this.scoreDisplay.innerHTML = `Score: ${Math.round(this.currentTime/5)}`;
    }

    updateHighScoreDisplay() {
        this.highScore = Math.max(this.highScore, Math.round(this.currentTime/5));
        if (this.highScoreDisplay == null) {
            this.highScoreDisplay = document.getElementById('highScoreDisplay');
        }
        this.highScoreDisplay.innerHTML = `High Score: ${this.highScore}`;
    }

    resetGame() {
        this.previousTime = this.currentTime;
        this.squid.setGame();
        this.enemies = this.enemies.slice(0, 2);
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].setGame();
            while (this.enemies[i].checkCollision(this.squid, 200) || this.enemies[i].x >= this.canvas.width - 90 || this.enemies[i].y >= this.canvas.height - 90) {
                this.enemies[i].setGame();
            }
        }
    }

    restartGame() {
        this.resetGame();
        this.gameOver = false;
        this.updateHighScoreDisplay();
        this.currentTime = 0;
        this.previousTime = 0;
        this.hearts = 3;
        this.updateScoreDisplay(); // Reset the score display
    }
}
