const ai = new neataptic.Neat(8, 2, null, {
    popsize: NB_GAMES,
    elitism: ELITISM,
    mutationRate: CHANCE_MUTATION,
    mutationAmount: NB_MUTATIONS
});

neataptic.Config.warnings = false;

const chart = new Chart('#chart', {
    type: 'line',
    height: 200,
    data: {
        labels: [],
        datasets: [
            {
                name: 'Max',
                values: [],
            },
            {
                name: 'Average',
                values: []
            },
        ]
    },
});

let champion = 0;

const env = new Environment(ai, chart);

env.start();
