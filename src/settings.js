const NB_GAMES = 16 * 6;
document.getElementById("nbGamesSettings").innerHTML = NB_GAMES;
const GRID_SIZE = 100;
document.getElementById("gameSize").innerHTML = GRID_SIZE;
const PIXEL = 5;
document.getElementById("pixelSize").innerHTML = PIXEL;
const GAME_ROW_SIZE = GRID_SIZE / PIXEL;
const FPS = 48;
document.getElementById("fps").innerHTML = FPS;

const STARVATION_TIME = 200;
document.getElementById("starvation").innerHTML = STARVATION_TIME;

const NB_MUTATIONS = 3;
document.getElementById("mutSize").innerHTML = NB_MUTATIONS;
const CHANCE_MUTATION = 0.5;
document.getElementById("mutRate").innerHTML = CHANCE_MUTATION;
const ELITISM = Math.round(0.2 * NB_GAMES);
document.getElementById("elitism").innerHTML = ELITISM;
const DECREASE_MUTATION_RATE = true;
document.getElementById("mutRateDec").innerHTML = DECREASE_MUTATION_RATE.toString();
