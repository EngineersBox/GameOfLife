let COLS
let ROWS
let SQUARE_WIDTH

let grid;
let rungame = false;
let canvas;

function getElem(id) {
    return document.getElementById(id);
}

function initGrid() {
    COLS = parseInt(getElem("cols_in").value);
    ROWS = parseInt(getElem("rows_in").value);
    SQUARE_WIDTH = parseInt(getElem("sq_width").value);
}

function setup() {
    initGrid();
    canvas = createCanvas(SQUARE_WIDTH * COLS, SQUARE_WIDTH * ROWS);
    canvas.parent("sketch_view");
    grid = new Grid(COLS, ROWS);
}

/**
 * Update the DOM elements to reflect the run state of the grid
 * and update the grid run state
 */
function runGame() {
    let state = getElem("state");
    let run = getElem("run");
    if (rungame == false) {
        state.className = "started";
        state.innerText = "Running";
        run.innerText = "Stop";
    } else {
        state.className = "stopped";
        state.innerText = "Stopped";
        run.innerText = "Start";
    }
    rungame = !rungame;
}

/**
 * Initialise the grid with the specified value in the DOM form 'gridfill' 
 */
function newgrid() {
    setup();
    grid.newGrid(getElem("gf_white").checked ? 1 : 0);
}

function draw() {
    if (rungame == true) {
        grid.applyRules();
    }
    for (let i = 0; i < grid.grid.length; i++) {
        for (let j = 0; j < grid.grid[0].length; j++) {
            let state = grid.state(i, j);
            stroke(127.5);
            fill(255 * state);
            rect(i * SQUARE_WIDTH, j * SQUARE_WIDTH, SQUARE_WIDTH, SQUARE_WIDTH);
        }
    }

}