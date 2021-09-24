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

    occupyCell(pos) {
        this.grid[pos.y][pos.x] = true;
    }

    isCellOccupied(pos) {
        return this.grid[pos.y][pos.x];
    }

    getNextVerticalPos(pos) {
        return { y: pos.y + 1, x: pos.x };
    }

    getLeftPos(pos) {
        return { y: pos.y, x: pos.x - 1 };
    }

    getRightPos(pos) {
        return { y: pos.y, x: pos.x + 1 };
    }

    canMoveDown(currentPos) {
        return currentPos.y < this.rows - 1 &&
            !this.isCellOccupied(this.getNextVerticalPos(currentPos));
    }

    canMoveLeft(currentPos) {
        return currentPos.x > 0 &&
            !this.isCellOccupied(this.getLeftPos(currentPos));
    }

    canMoveRight(currentPos) {
        return currentPos.x < this.cols - 1 &&
            !this.isCellOccupied(this.getRightPos(currentPos))
    }

    startGame() {
        const START_POS = { x: 4, y: 0 };
        let currentSquarePos = {...START_POS};

        let currentActiveSquare = new Square(
            this.gridToPixel(currentSquarePos),
            this.c, this.baseUnitSideLength, "lightblue", this.bgColor);

        currentActiveSquare.display();

        window.onkeydown = (e) => {
            let key = e.key || e.keyCode;
            switch (key) {

                case "ArrowDown": case "s":
                    if (this.canMoveDown(currentSquarePos)) {
                        currentActiveSquare.drop();
                        currentSquarePos.y++;
                    };
                    break;

                case "ArrowLeft": case "a":
                    if (this.canMoveLeft(currentSquarePos)) {
                        currentActiveSquare.left();
                        currentSquarePos.x--;
                    };
                    break;

                case "ArrowRight": case "d":
                    if (this.canMoveRight(currentSquarePos)) {
                        currentActiveSquare.right();
                        currentSquarePos.x++;
                    };
                    break;

            }
        }

        const gInterval = setInterval(() => {

            if (currentSquarePos.y < this.rows - 1 &&
                !this.isCellOccupied(this.getNextVerticalPos(currentSquarePos))) {

                currentActiveSquare.drop();
                currentSquarePos.y++
            } else {

                this.occupyCell(currentSquarePos);

                currentSquarePos = {...START_POS};
                console.log(`currentSquarePos: `, currentSquarePos);
                currentActiveSquare = new Square(
                    this.gridToPixel(currentSquarePos),
                    this.c, this.baseUnitSideLength, "lightblue", this.bgColor);

                currentActiveSquare.display();

            }
        },
            1000);
    }
}

const gb = new Gameboard({ x: 0, y: 0 }, ctx, "white", 21, 10, 15)
gb.drawGameboard();
gb.startGame();