class Game {
    constructor(environment) {
        this.environment = environment;
        this.onGoing = false;
        this.grid = [];
        this.snake = new Snake(this);
        this.turns = 0;

        for (let x = 0; x < GAME_ROW_SIZE; x++) {
            for (let y = 0; y < GAME_ROW_SIZE; y++) {
                this.grid.push([x + 1, y + 1])
            }
        }

        this.graph = new p5(p => {
            p.setup = function() {
                p.frameRate(FPS);
                p.createCanvas(GRID_SIZE, GRID_SIZE);
            }
      
            p.drawFood = function() {
                p.fill('red');
                p.rect(
                    PIXEL * (this.food.position[0] - 1),
                    PIXEL * (this.food.position[1] - 1),
                    PIXEL,
                    PIXEL
                );
            }
      
            p.drawSnake = function() {
                p.noStroke()
                let highscore = document.getElementById("highscore").innerHTML;
                let color = this.snake.ai.score > highscore ? '#00FFFF' : '#39FF14';

                let opacityInt = 255 - 200 * this.snake.uselessTurns / STARVATION_TIME;
                let opacity = opacityInt.toString(16);
                color += opacity;
              
                p.fill(color);
                this.snake.tail.forEach(s => {
                    p.rect(
                        PIXEL * (s[0] - 1),
                        PIXEL * (s[1] - 1),
                        PIXEL,
                        PIXEL
                    )
                });
            }
      
            p.draw = function() {
                if (!this.onGoing) {
                    p.background('#202020');
                    p.fill(255);
                    p.textSize(20);
                    p.text(this.snake.ai.score.toString(), 45, 55);
                    return;
                }
      
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
        }, 'games')
    }
      
    freeSpaces() {
        return this.grid.filter(position => {
            return !this.snake.tail.some(segment => {
                return position[0] === segment[0] && position[1] === segment[1]
            })
        });
    }
      
    start() {
        this.turns = 0;
        this.snake.init();
        this.food = new Apple(this);
        this.onGoing = true;
    }
}