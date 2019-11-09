function create2DArray(cols, rows, value=0) {
    return [...Array(cols)].map(x => Array(rows).fill(value));
}

class Grid {

    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.grid = create2DArray(this.cols, this.rows);
        this.surroundings = [
            [-1, 1],
            [0, 1],
            [1, 1],
            [-1, 0],
            [1, 0],
            [-1, -1],
            [0, -1],
            [1, -1]

        ];
    }

    newGrid(value=0) {
        this.grid = create2DArray(this.cols, this.rows, value);
    }

    randomise() {
        // '~~' is shorthand for Math.floor()
        this.grid = this.grid.map(x => x.map(e => ~~(Math.random() * 2)));
    }

    applyRules() {
        let tempGrid = this.grid.slice();
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                let count = 0;
                for (let coord of this.surroundings) {
                    if (this.state(coord[0], coord[1])) {
                        count += this.state(coord[0], coord[1]);
                    }
                }
                console.log(count);
                if (this.grid[i][j] == 1) {
                    if (count < 2 || count > 3) {
                        tempGrid[i][j] = 0;
                    }
                } else {
                    if (count == 3) {
                        tempGrid[i][j] = 1;
                    }
                }
            }
        }
        this.grid = tempGrid;
    }

    state(x, y) {
        if (0 <= x && x < this.grid.length && 0 <= y && y < this.grid[0].length) {
            return this.grid[x][y];
        } else {
            return null;
        }
    }

}