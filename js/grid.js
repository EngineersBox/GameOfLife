function create2DArray(cols, rows, value=0) {
    return [...Array(cols)].map(x => Array(rows).fill(value));
}

class Grid {

    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.grid = create2DArray(this.cols, this.rows);
    }

    newGrid(value=0) {
        this.grid = create2DArray(this.cols, this.rows, value);
    }

    randomise() {
        // '~~' is shorthand for Math.floor()
        this.grid = this.grid.map(x => x.map(e => ~~(Math.random() * 2)));
    }

}