class Sketch {
    constructor(map) {
        this.map = map;
    }

    setup() {

    }
}

let sketch = function(p) {
    p.setup = function() {
        p.frameRate(FPS);
        p.createCanvas(GRID_SIZE, GRID_SIZE);
    }

    p.drawFood = function() {
        p.fill('red');
        p.rect(PIXEL * (map.food.position[0] - 1),
               PIXEL * (map.food.position[1] - 1),
               PIXEL,
               PIXEL
        );
    }

    p.drawSnake = function() {
        p.noStroke()
        let highscore = document.getElementById("highscore").innerHTML;
        let color = map.snake.ai.score > highscore ? '#00FFFF' : '#39FF14';

        let opacityInt = 255 - 200 * map.snake.uselessTurns / STARVATION_TIME;
        let opacity = opacityInt.toString(16);
        color += opacity;
      
        p.fill(color);
        map.snake.tail.forEach(s => {
            p.rect(PIXEL * (s[0] - 1),
                   PIXEL * (s[1] - 1),
                   PIXEL,
                   PIXEL
            )
        });
    }

    p.draw = function() {
        if (!map.onGoing) {
            p.background('#202020');
            p.fill(255);
            p.textSize(20);
            p.text(this.snake.ai.score.toString(), 45, 55);
        } else {

            p.background('#424242');

            this.snake.move();

            if (this.snake.isEating) {
                this.food = new Apple(this);
            }

            this.onGoing = !this.snake.isDead(); 

            if (!this.onGoing) {
                return this.environment.end()
            }

            p.drawSnake()
            p.drawFood()

            this.turns++
        }
    }
}