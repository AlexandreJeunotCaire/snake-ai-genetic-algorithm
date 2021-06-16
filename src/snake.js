class Snake {
    constructor(game) {
        this.game = game;
        this.uselessTurns = 0;
    }
  
    init() {
        this.tail = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1]];
        this.direction = 1;
        this.isEating = false;
        this.uselessTurns = 0;
    }
  
    changeDirection(newDirection) {
        this.direction = (this.direction + 4 + newDirection) % 4;
    }
  
    getAngleFood() {
        let horizontal = this.direction % 2;
        let direction = this.direction < 2 ? 1 : -1;
        if (this.game.food.position[horizontal] < this.tail[this.tail.length - 1][horizontal]) { 
            return -1 * direction;
        } 
      
        if (this.game.food.position[horizontal] > this.tail[this.tail.length - 1][horizontal]) {
            return direction;
        }
        return 0;
    }
  
    normalizedDistance(i0, j0, i1, j1) {
        return Math.sqrt((i0 - i1) ** 2 + (j0 - j1) ** 2) / GAME_ROW_SIZE;
    }
  
    move() {
        let forwardOK = 0;
        let leftOK = 0;
        let rightOK = 0;
        let isFoodForward = 0;
        let distanceFront = 1;
        let candidatDistFront = 1;
        let distanceRight = 1;
        let candidatDistRight = 1;
        let distanceLeft = 1;
        let candidatDistLeft = 1;
        let foodAngle = this.getAngleFood();
        let head = this.tail[this.tail.length - 1];
  
  
        switch (this.direction) {
            case 0:
            if (head[1] !== 1) {
                forwardOK = 1;
                candidatDistFront = this.normalizedDistance(1, head[1], head[0], head[1]);
                if (candidatDistFront < distanceFront) {
                    distanceFront = candidatDistFront;
                }
            }
            if (head[0] !== 1) {
                leftOK = 1;
                candidatDistLeft = this.normalizedDistance(head[0], 1, head[0], head[1]);
                if (candidatDistLeft < distanceLeft) {
                distanceLeft = candidatDistLeft;
                }
            }
            if (head[0] !== GAME_ROW_SIZE) {
                rightOK = 1;
                candidatDistRight = this.normalizedDistance(head[0], GAME_ROW_SIZE, head[0], head[1]);
                if (candidatDistRight < distanceRight) {
                distanceRight = candidatDistRight;
                }
            }
            if (this.game.food.position[1] < head[1]) {
                isFoodForward = 1;
            }
    
            for (const e of this.tail) {
                if (e[0] === head[0] && e[1] === head[1] - 1) {
                forwardOK = 0;
                } else if (e[1] === head[1]) {
                if (e[0] === (head[0] - 1)) {
                    leftOK = 0;
                } else if (e[0] === head[0] + 1) {
                    rightOK = 0;
                }
                }
            }
    
            for (const e of this.tail) {
                if (e[0] === head[0] && e[1] < head[1]) {
                candidatDistFront = this.normalizedDistance(e[0], e[1], head[0], head[1]);
                if (candidatDistFront < distanceFront) {
                    distanceFront = candidatDistFront;
                }
                } else if (e[1] === head[1]) {
                if (e[0] < head[0]) {
                    candidatDistLeft = this.normalizedDistance(e[0], e[1], head[0], head[1]);
                    if (candidatDistLeft < distanceLeft) {
                    distanceLeft = candidatDistLeft;
                    }
                } else if (e[0] > head[0]) {
                    candidatDistRight = this.normalizedDistance(e[0], e[1], head[0], head[1]);
                    if (candidatDistRight < distanceRight) {
                    distanceRight = candidatDistRight;
                    }
                }
                }
            }
            break;
    
            case 1:
            if (head[0] !== GAME_ROW_SIZE) {
                forwardOK = 1;
            }
    
            if (head[1] !== 1) {
                leftOK = 1;
            }
    
            if (head[1] !== GAME_ROW_SIZE) {
                rightOK = 1;
            }
    
            if (this.game.food.position[0] > head[0]) {
                isFoodForward = 1;
            }
    
            for (const e of this.tail) {
                if (head[1] === e[1] && head[0] + 1 === e[0]) {
                forwardOK = 0;
                } else if (head[0] === e[0]) {
                if (head[1] - 1 === e[1]) {
                    leftOK = 0;
                } else if (head[1] + 1 === e[1]) {
                    rightOK = 0;
                }
                }
            }
    
            for (const e of this.tail) {
                if (e[1] === head[1] && e[0] > head[0]) {
                candidatDistFront = this.normalizedDistance(e[0], e[1], head[0], head[1]);
                if (candidatDistFront < distanceFront) {
                    distanceFront = candidatDistFront;
                }
                } else if (e[0] === head[0]) {
                if (e[1] < head[1]) {
                    candidatDistLeft = this.normalizedDistance(e[0], e[1], head[0], head[1]);
                    if (candidatDistLeft < distanceLeft) {
                    distanceLeft = candidatDistLeft;
                    }
                } else if (e[1] > head[1]) {
                    candidatDistRight = this.normalizedDistance(e[0], e[1], head[0], head[1]);
                    if (candidatDistRight < distanceRight) {
                    distanceRight = candidatDistRight;
                    }
                }
                }
            }
            break;
    
            case 2:
            if (head[1] !== GAME_ROW_SIZE) {
                forwardOK = 1;
            }
    
            if (head[0] !== GAME_ROW_SIZE) {
                leftOK = 1;
            }
    
            if (head[0] !== 1) {
                rightOK = 1;
            }
    
            if (this.game.food.position[1] > head[1]) {
                isFoodForward = 1;
            }
    
            for (const e of this.tail) {
                if (head[0] === e[0] && head[1] + 1 === e[1]) {
                forwardOK = 0;
                } else if (head[1] === e[1]) {
                if (head[0] + 1 === e[0]) {
                    leftOK = 0;
                } else if (head[0] - 1 === e[0]) {
                    rightOK = 0;
                }
                }
            }
    
            for (const e of this.tail) {
                if (e[0] === head[0] && e[1] > head[1]) {
                candidatDistFront = this.normalizedDistance(e[0], e[1], head[0], head[1]);
                if (candidatDistFront < distanceFront) {
                    distanceFront = candidatDistFront;
                }
                } else if (e[1] === head[1]) {
                if (e[0] > head[0]) {
                    candidatDistLeft = this.normalizedDistance(e[0], e[1], head[0], head[1]);
                    if (candidatDistLeft < distanceLeft) {
                    distanceLeft = candidatDistLeft;
                    }
                } else if (e[0] < head[0]) {
                    candidatDistRight = this.normalizedDistance(e[0], e[1], head[0], head[1]);
                    if (candidatDistRight < distanceRight) {
                    distanceRight = candidatDistRight;
                    }
                }
                }
            }
    
            break;
    
            case 3:
            if (head[0] !== 1) {
                forwardOK = 1;
            }
    
            if (head[1] !== GAME_ROW_SIZE) {
                leftOK = 1;
            }
    
            if (head[1] !== 1) {
                rightOK = 1;
            }
    
            if (this.game.food.position[0] < head[0]) {
                isFoodForward = 1;
            }
    
            for (const e of this.tail) {
                if (head[1] === e[1] && head[0] - 1 === e[0]) {
                forwardOK = 0;
                } else if (head[0] === e[0]) {
                if (head[1] + 1 === e[1]) {
                    leftOK = 0;
                } else if (head[1] - 1 === e[1]) {
                    rightOK = 0;
                }
                }
            }
    
            for (const e of this.tail) {
                if (e[1] === head[1] && e[0] < head[0]) {
                candidatDistFront = this.normalizedDistance(e[0], e[1], head[0], head[1]);
                if (candidatDistFront < distanceFront) {
                    distanceFront = candidatDistFront;
                }
                } else if (e[0] === head[0]) {
                if (e[1] > head[1]) {
                    candidatDistLeft = this.normalizedDistance(e[0], e[1], head[0], head[1]);
                    if (candidatDistLeft < distanceLeft) {
                    distanceLeft = candidatDistLeft;
                    }
                } else if (e[1] < head[1]) {
                    candidatDistRight = this.normalizedDistance(e[0], e[1], head[0], head[1]);
                    if (candidatDistRight < distanceRight) {
                    distanceRight = candidatDistRight;
                    }
                }
                }
            }
            break;
        }
        
        const possibleMoves = this.ai.activate([forwardOK, distanceFront, leftOK, distanceLeft, rightOK, distanceRight, isFoodForward, foodAngle]).map(o => Math.round(o))
    
        if (possibleMoves[0]) {
            if (foodAngle === 1) {
                this.uselessTurns++;
            }
            
            this.changeDirection(-1);
    
        } else if (possibleMoves[1]) {
            if (foodAngle === -1) {
                this.uselessTurns++;
            }
            this.changeDirection(1);
    
        } else {
            if (!isFoodForward) {
                this.uselessTurns++;
            }
        }
    
        if (this.isEating) {
            switch (this.direction) {
            case 0: this.tail.push([head[0], head[1] - 1]); break
            case 2: this.tail.push([head[0], head[1] + 1]); break
            case 3: this.tail.push([head[0] - 1, head[1]]); break
            case 1: this.tail.push([head[0] + 1, head[1]]); break
            }
    
            this.isEating = false
        } else {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i][0] = this.tail[i + 1][0]
                this.tail[i][1] = this.tail[i + 1][1]
            }
    
            head = this.tail[this.tail.length - 1]
    
            switch (this.direction) {
            case 0:
                head[0] = this.tail[this.tail.length - 2][0];
                head[1] = this.tail[this.tail.length - 2][1] - 1;
                break;
            case 2:
                head[0] = this.tail[this.tail.length - 2][0];
                head[1] = this.tail[this.tail.length - 2][1] + 1;
                break;
            case 3:
                head[0] = this.tail[this.tail.length - 2][0] - 1;
                head[1] = this.tail[this.tail.length - 2][1];
                break;
            case 1:
                head[0] = this.tail[this.tail.length - 2][0] + 1;
                head[1] = this.tail[this.tail.length - 2][1];
                break;
            }
        }
    
        head = this.tail[this.tail.length - 1];
    
        if (this.game.food.position[0] === head[0] && this.game.food.position[1] === head[1]) {
            this.isEating = true;
            this.uselessTurns = 0;
            this.ai.score++;
        }
    }
    
    isDead() {
        const head = this.tail[this.tail.length - 1];
        if (head[0] < 1 || head[0] > GAME_ROW_SIZE || head[1] < 1 || head[1] > GAME_ROW_SIZE) {
            return true;
        }
        if (this.tail.some((tailPart, index) => tailPart[0] === head[0] && tailPart[1] === head[1] && index != this.tail.length - 1)) {
            return true;
        }
        if (this.uselessTurns > STARVATION_TIME) {
            return true;
        }
        return false;
    }
}
    