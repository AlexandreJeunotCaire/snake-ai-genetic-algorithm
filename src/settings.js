const NB_GAMES = 16 * 5;
const GRID_SIZE = 100;
const PIXEL = 5;
const GAME_ROW_SIZE = GRID_SIZE / PIXEL;
const FPS = 48;

const STARVATION_TIME = 200;

const NB_MUTATIONS = 3;
const CHANCE_MUTATION = 0.3;
const ELITISM = Math.round(0.15* NB_GAMES);