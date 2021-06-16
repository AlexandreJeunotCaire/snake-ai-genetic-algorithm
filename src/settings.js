const NB_GAMES = 16 * 6
const GRID_SIZE = 100
const PIXEL = 5
const GAME_ROW_SIZE = GRID_SIZE / PIXEL;
const FPS = 45

const STARVATION_TIME = 200;

const NB_MUTATIONS = 3
const CHANCE_MUTATION = 0.5
const ELITISM = Math.round(0.2 * NB_GAMES)

// score settings

const POINTS_MOVED_TOWARDS_FOOD = 1
const POINTS_MOVED_AGAINST_FOOD = -1.5
const POINTS_ATE_FOOD = 2
