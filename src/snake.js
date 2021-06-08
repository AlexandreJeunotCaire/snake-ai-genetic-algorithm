class Snake {
    constructor() {
        this.apples = 0;
        this.direction = 'right';
        this.tail = [[4,7],
                     [5,7],
                     [6,7],
                     [7,7]];
        this.isEating = false;
    }

    define_game(game) {
        this.game = game;
    }

    directionToArray() {
        let res = [0, 0];
        if (this.direction === 'up') {
            return [0, -1];
        }
        if (this.direction === 'right') {
            return [1, 0];
        }
        if (this.direction === 'down') {
            return [0, 1];
        }
        return [-1, 0];
    }

    move() {
        const FORWARD = 0;
        const RIGHT = 1;
        const LEFT = 2;
        let movements = [false, false, false];
        let food = [false, false, false];
        switch (this.direction) {
            case 'up': 
                movements[FORWARD] = (this.y > 0);
                movements[RIGHT] = (this.x < this.game.width - 1);
                movements[LEFT] = (this.x > 0);

                food[FORWARD] = (this.game.food.y < this.y);
                food[RIGHT] = (this.game.food.x > this.x);
                food[LEFT] = (this.game.food.x < this.x);

                this.tail.forEach(e => {
                    if (this.x === e[0] && this.y - 1 === e[1]) movements[FORWARD] = false;
                    if (this.x + 1 === e[1] && this.y === e[1]) movements[RIGHT] = false;
                    if (this.x - 1 === e[0] && this.y === e[1]) movements[LEFT] = false;
                });

                break;

            case 'right': 
                movements[FORWARD] = (this.x < this.game.width - 1);
                movements[RIGHT] = (this.y < this.game.height - 1);
                movements[LEFT] = (this.y > 0);

                food[FORWARD] = (this.game.food.x > this.x);
                food[RIGHT] = (this.game.food.y > this.y);
                food[LEFT] = (this.game.food.y < this.y);

                this.tail.forEach(e => {
                    if (this.y === e[1] && this.x + 1 === e[0]) movements[FORWARD] = false;
                    if (this.y - 1 === e[1] && this.x === e[0]) movements[RIGHT] = false;
                    if (this.y + 1 === e[1] && this.x === e[0]) movements[LEFT] = false;
                });

                break;

            case 'down': 
                movements[FORWARD] = (this.y < this.game.height - 1)
                movements[RIGHT] = (this.x > 0);
                movements[LEFT] = (this.x < this.game.width - 1);

                food[FORWARD] = (this.game.food.y > this.y);
                food[RIGHT] = (this.game.food.x < this.x);
                food[LEFT] = (this.game.food.x > this.x);

                this.tail.forEach(e => {
                    if (this.x === e[0] && this.y + 1 === e[1]) movements[FORWARD] = false;
                    if (this.x - 1 === e[1] && this.y === e[1]) movements[RIGHT] = false;
                    if (this.x + 1 === e[0] && this.y === e[1]) movements[LEFT] = false;
                });

                break;

            case 'left': 
                movements[FORWARD] = (this.x > 0);
                movements[RIGHT] = (this.y > 0);
                movements[LEFT] = (this.y < this.game.height - 1);

                food[FORWARD] = (this.game.food.x < this.x);
                food[RIGHT] = (this.game.food.y < this.y);
                food[LEFT] = (this.game.food.y > this.y);

                this.tail.forEach(e => {
                    if (this.x - 1 === e[0] && this.y === e[1]) movements[FORWARD] = false;
                    if (this.x === e[0] && this.y - 1 === e[1]) movements[RIGHT] = false;
                    if (this.x === e[0] && this.y + 1 === e[1]) movements[LEFT] = false;
                });

                break;

            default:
                break;
        }

        let decision = Math.floor(Math.random() * 3);
        
        if (decision === 0) { // we turn left
            switch (this.direction) {
                case 'up':
                    this.direction = 'left';
                    break;
                case 'right':
                    this.direction = 'up';
                    break;
                case 'down':
                    this.direction = 'right';
                    break;
                case 'left':
                    this.direction = 'down';
                default:
                    break;
            }

        } else if (decision === 1) {} // we go forward
          else { // we turn right
            switch (this.direction) {
                case 'up':
                    this.direction = 'right';
                    break;
                case 'right':
                    this.direction = 'down';
                    break;
                case 'down':
                    this.direction = 'left';
                    break;
                case 'left':
                    this.direction = 'up';
                default:
                    break;
            }      
        }

        if (this.isEating) {
            let dir = this.directionToArray();
            this.tail.push([this.x + dir[0], this.y + dir[1]]);
            this.isEating = false;
        } else {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i+1];
            }
        }

        switch (this.direction) {
            case 'up':
                this.tail[this.tail.length - 1][0] = this.tail[this.tail.length - 2][0];
                this.tail[this.tail.length - 1][1] = this.tail[this.tail.length - 2][1] - 1
                break;
            case 'right':
                this.tail[this.tail.length - 1][0] = this.tail[this.tail.length - 2][0] + 1;
                this.tail[this.tail.length - 1][1] = this.tail[this.tail.length - 2][1];
                break;
            case 'down':
                this.tail[this.tail.length - 1][0] = this.tail[this.tail.length - 2][0];
                this.tail[this.tail.length - 1][1] = head[1] = this.tail[this.tail.length - 2][1] + 1;
                break;
            case 'left':
                this.tail[this.tail.length - 1][0] = this.tail[this.tail.length - 2][0] - 1;
                this.tail[this.tail.length - 1][1] = this.tail[this.tail.length - 2][1];
                break;
            default:
                break;
        }
        let last = this.tail[this.tail.length - 1];
        this.x = last[0];
        this.y = last[1];

        this.eat();
    }

    isOnFood() {
        return (this.game.food.x === this.x && this.game.food.y === this.y);
    }

    eat() {
        if (this.isOnFood()) {
            this.apples++;
            this.isEating = true;
        }

    }

    die() {
        if (this.x < 0 || this.x >= this.game.width || this.y < 0 || this.y >= this.game.heigh) {
            return true;
        }
        for (let coord of this.tail.slice(0, -1)) {
            if (coord[0] == this.x && coord[1] == this.y) {
                return true;
            }
        }
        return false;
    }
}