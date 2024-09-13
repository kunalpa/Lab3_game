class Model {
    constructor(canvas) {
        this.canvas = canvas;
        this.hearts = 3;
        this.squid;
        this.enemies = [];
        this.current_time = 0;
        this.previous_time = 0;
        this.time_delay = 200;  // delay before new enemies are added
        this.game_over = false;
        this.high_score = 0;
        this.loadObjects();
        this.restartGame();
        this.loadImages();

        this.restart_button = document.getElementById("restart_button");
        this.score_display;
        this.high_score_display;
        this.setuprestart_button();
    }

    setuprestart_button() {
        this.restart_button.addEventListener('click', () => {
            this.restartGame();
            this.hiderestart_button();
        });
    }

    showrestart_button() {
        this.restart_button.style.display = "block";
    }

    hiderestart_button() {
        this.restart_button.style.display = "none";
    }

    loadObjects() {
        this.squid = new Squidward(this.canvas);
        this.enemies.push(new Spongebob(this.canvas, this.squid));
        this.enemies.push(new Patrick(this.canvas, this.squid));
    }

    loadImages() {
        this.heart_img = new Image();
        this.heart_img.src = '../resources/images/heart.png';
    }

    updatePositions() {
        if (this.game_over) {
            return;
        }

        this.current_time++;
        this.updateScoreDisplay();

        if (this.current_time - this.previous_time > this.time_delay) {
            this.previous_time = this.current_time;
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
                    this.game_over = true;
                    this.showrestart_button();
                    return;
                }
                this.resetGame();
            }
        }
    }

    updateScoreDisplay() {
        if (this.score_display == null) {
            this.score_display = document.getElementById('score_display');
        }
        this.score_display.innerHTML = `Score: ${Math.round(this.current_time/5)}`;
    }

    updatehighScoreDisplay() {
        this.high_score = Math.max(this.high_score, Math.round(this.current_time/5));
        if (this.high_score_display == null) {
            this.high_score_display = document.getElementById('high_score_display');
        }
        this.high_score_display.innerHTML = `High Score: ${this.high_score}`;
    }

    resetGame() {
        this.previous_time = this.current_time;
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
        this.game_over = false;
        this.updatehighScoreDisplay();
        this.current_time = 0;
        this.previous_time = 0;
        this.hearts = 3;
        this.updateScoreDisplay(); // Reset the score display
    }
}
