'use strict';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("Gameboard");
const ctx = canvas.getContext("2d");

class Gameboard {
    constructor(origin, context, bgColor, rows, cols, baseUnitSideLength) {
        this.o = origin;
        this.c = context;
        this.bgColor = bgColor;
        this.rows = rows;
        this.cols = cols;
        this.baseUnitSideLength = baseUnitSideLength;
        this.grid = this.newEmptyGrid();
    }

    newEmptyGrid() {
        const g = new Array(this.rows);
        for (let i = 0; i < g.length; i++) {
            g[i] = new Array(this.cols)
            for (let j = 0; j < g[i].length; j++) {
                g[i][j] = false;
            }
        }
        return g;
    }

    drawGameboard() {
        this.c.save();
        this.c.beginPath();
        this.c.fillStyle = this.bgColor;

        this.c.rect(this.o.x, this.o.y,
            this.cols * this.baseUnitSideLength,
            this.rows * this.baseUnitSideLength);
        this.c.fill();
        this.c.restore();
    }

    gridToPixel(gridCoordinate) {
        return { x: gridCoordinate.x * this.baseUnitSideLength, y: gridCoordinate.y * this.baseUnitSideLength }
    }

    startGame() {
        const currentSquarePos = { x: 4, y: 0 };

        const s1 = new Square(
            this.gridToPixel(currentSquarePos),
            this.c, this.baseUnitSideLength, "lightblue", this.bgColor);

        s1.display();

        const rows = this.rows;
        const grid = this.grid;

        const gInterval = setInterval(function () {
            if (currentSquarePos.y < rows - 1) {
                s1.drop();
                currentSquarePos.y++
            } else {
                grid[currentSquarePos.y][currentSquarePos.x] = true;
            }
        },
            300);
    }
}


const gb = new Gameboard({ x: 0, y: 0 }, ctx, "white", 21, 10, 15)
gb.drawGameboard();
gb.startGame();
// console.table(gb.grid);

function drawRect(c, x, y, height, width, background) {
    c.save();
    c.beginPath();
    c.fillStyle = background;

    c.rect(x, y, width, height);
    c.fill();
    c.restore();
}