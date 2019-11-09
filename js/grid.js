/**
 * Generate a 2D array of dimensions cols x rows filled with
 * the specified value
 * 
 * @param {Number} cols 
 * @param {Number} rows 
 * @param {Number} value 
 * @returns {Array}
 */
function create2DArray(cols, rows, value=0) {
    return [...Array(cols)].map(x => Array(rows).fill(value));
}

class Grid {

    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.grid = create2DArray(this.cols, this.rows);
        this.neighbours = [
            {x:-1, y:-1},
            {x:-1, y: 0},
            {x:-1, y: 1},
            {x: 0, y:-1},
            {x: 0, y: 1},
            {x: 1, y:-1},
            {z: 1, y: 0},
            {x: 1, y: 1}
        ];
    }

    /**
     * Fill the grid with the specified value
     * @param {Number} value 
     */
    newGrid(value=0) {
        this.grid = create2DArray(this.cols, this.rows, value);
    }

    /**
     * Generate random 0's and 1's in the grid.
     * Probability of a 0 is proportional to 2 - multiplier
     * 
     * @param {Number} multiplier 
     */
    randomise(multiplier=1.5) {
        // '~~' is shorthand for Math.floor()
        this.grid = this.grid.map(x => x.map(e => ~~(Math.random() * multiplier)));
    }

    /**
     * Apply the rules of John Conway's Game of Life
     * to the current grid state
     */
    applyRules() {
        let tempGrid = this.grid.slice();
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                let live_count = this.neighbours.reduce((acc, pos) => 
                    acc + this.state(
                        (i + pos.x + this.cols) % this.cols,
                        (j + pos.y + this.rows) % this.rows)
                , 0);
                if (this.grid[i][j] == 1) {
                    tempGrid[i][j] = (live_count < 2 || live_count > 3) ? 0 : 1;
                } else {
                    tempGrid[i][j] = (live_count == 3) ? 1 : 0;
                }
            }
        }
        this.grid = tempGrid;
    }

    /**
     * Return the binary state of a valid position
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Number}
     */
    state(x, y) {
        if (0 <= x && x < this.grid.length && 0 <= y && y < this.grid[0].length) {
            return this.grid[x][y];
        } else {
            return null;
        }
    }

}