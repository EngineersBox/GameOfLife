const COLS = 30;
const ROWS = 30;
const SQUARE_WIDTH = 20;

let grid;
let rungame = false;

function setup() {
    let canvas = createCanvas(SQUARE_WIDTH * COLS, SQUARE_WIDTH * ROWS);
    canvas.parent("sketch_view");
    grid = new Grid(COLS, ROWS);
}

function runGame() {
    let state = document.getElementById("state");
    if (rungame == false) {
        state.className = "started";
        state.innerText = "Running";
    } else {
        state.className = "stopped";
        state.innerText = "Stopped";
    }
    rungame = !rungame;
}

function newgrid() {
    grid.newGrid(document.getElementById("gf_white").checked ? 1 : 0);
}

function draw() {
    if (rungame == true) {
        grid.applyRules();
    }
    for (let i = 0; i < grid.grid.length; i++) {
        for (let j = 0; j < grid.grid[0].length; j++) {
            let state = grid.state(i, j);
            stroke(0);
            fill(255 * state);
            rect(i * SQUARE_WIDTH, j * SQUARE_WIDTH, SQUARE_WIDTH, SQUARE_WIDTH);
        }
    }

}