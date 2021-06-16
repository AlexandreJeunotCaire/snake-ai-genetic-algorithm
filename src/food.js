class Apple {
    constructor(game) {
        const possible = game.freeSpaces();
        this.position = possible[Math.floor(Math.random() * possible.length)];
    }
}