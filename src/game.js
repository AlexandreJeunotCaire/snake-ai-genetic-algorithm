class Game {
    constructor() {
        this.snake = new Snake();
    }
    play() {
        this.snake.define_game(this);
        while (!this.snake.die()) {
            this.snake.move();
        }
    }
}

