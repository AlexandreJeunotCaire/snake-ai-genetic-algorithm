class Environment {
    constructor (ai, chart) {
        this.ai = ai;
        this.nbGames = [];
        this.nbGamesFinished = 0;
        this.chart = chart;
  
        for (let i = 0; i < NB_GAMES; i++) {
            this.nbGames.push(new Game(this));
        }
    }
  
    start() {
        this.nbGamesFinished = 0;
  
        for (let i = 0; i < NB_GAMES; i++) {
            this.nbGames[i].snake.ai = this.ai.population[i];
            this.nbGames[i].snake.ai.score = 0;
            this.nbGames[i].start();
            document.getElementById('highscore').innerHTML = champion;
        }

        document.getElementById("nbGames").innerHTML = NB_GAMES;
        document.getElementById('nbAlive').innerHTML = NB_GAMES - this.nbGamesFinished;
    }
  
    end() {
        if (this.nbGamesFinished + 1 < NB_GAMES) {
            this.nbGamesFinished++;
            document.getElementById('nbAlive').innerHTML = NB_GAMES - this.nbGamesFinished;
            return;
        }
  
        this.ai.sort();
  
        this.chart.data.labels.push(this.ai.generation.toString());
        let max = this.ai.getFittest().score;
        if (max > champion) {
            champion = max;
            document.getElementById('highscore').innerHTML = champion;
        }
        this.chart.data.datasets[0].values.push(max);
        this.chart.data.datasets[1].values.push(Math.round(this.ai.getAverage()));
  
        if (this.chart.data.labels.length > 30) {
            this.chart.data.labels.shift();
            this.chart.data.datasets.forEach(d => d.values.shift());
        }
  
        this.chart.update(this.chart.data);
        this.ai.generation++;
        document.getElementById('generation').innerHTML = this.ai.generation;
      
        const newGeneration = [];
      
        for (let i = 0; i < this.ai.elitism; i++) {
            newGeneration.push(this.ai.population[i]);
        }
      
        for (let i = 0; i < this.ai.popsize - this.ai.elitism; i++) {
            newGeneration.push(this.ai.getOffspring());
        }
      
        this.ai.population = newGeneration;
        this.ai.mutate();
        this.start();
    }
}
  