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

    occupyCells(shape) {
        shape.currentCells.forEach(cell => this.grid[cell.y][cell.x] = true);
    }

    hasConflicts(occupiedCells, movement) {
        for (const cell of occupiedCells) {
            switch (movement) {
                case "down": if (cell.y >= this.rows) { return true; } break;
                case "right": if (cell.x >= this.cols) { return true; } break;
                case "left": if (cell.x < 0) { return true; } break;
            }

            if (this.grid[cell.y][cell.x]) {
                return true;
            }
        }

        return false;
    }

    canMoveDown(shape) {
        const shapeOccupation = shape.returnCellsAfterDrop();
        return !this.hasConflicts(shapeOccupation, "down");
    }

    canMoveLeft(shape) {
        const shapeOccupation = shape.returnCellsAfterMoveLeft();
        return !this.hasConflicts(shapeOccupation, "left");
    }

    canMoveRight(shape) {
        const shapeOccupation = shape.returnCellsAfterMoveRight();
        return !this.hasConflicts(shapeOccupation, "right");
    }

    newShape(originCellHandlePoint) {
        switch (getRandomInt(7)) {
            case 0: return new IPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "lightblue", this.bgColor);
            case 1: return new OPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "#edf55f", this.bgColor);
            case 2: return new LPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "#ffae8c", this.bgColor);
            case 3: return new JPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "#4e63e6", this.bgColor);
            case 4: return new TPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "#c585f7", this.bgColor);
            case 5: return new SPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "#c585f7", this.bgColor);
            case 6: return new ZPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "#c585f7", this.bgColor);
        }
    }
    
    startGame() {
        const START_POS = { x: 4, y: 0 };

        let currentActiveSquare = this.newShape(START_POS);

        currentActiveSquare.display();

        window.onkeydown = (e) => {
            let key = e.key || e.keyCode;
            switch (key) {

                case "ArrowDown": case "s":
                    if (this.canMoveDown(currentActiveSquare)) {
                        currentActiveSquare.drop();
                    };
                    break;

                case "ArrowLeft": case "a":
                    if (this.canMoveLeft(currentActiveSquare)) {
                        currentActiveSquare.left();
                    };
                    break;

                case "ArrowRight": case "d":
                    if (this.canMoveRight(currentActiveSquare)) {
                        currentActiveSquare.right();
                    };
                    break;

                case "ArrowUp": case "w":
                    if (this.canMoveRight(currentActiveSquare)) {
                        currentActiveSquare.turn();
                    };
                    break;

            }
        }

        const gInterval = setInterval(() => {
            if (this.canMoveDown(currentActiveSquare)) {
                currentActiveSquare.drop();
            } else {
                this.occupyCells(currentActiveSquare);
                currentActiveSquare = this.newShape(START_POS);
                currentActiveSquare.display();
            }
        },
            500);

        setInterval(() => {
            window.scroll(0, 10);
            window.scroll(0, 11);
        }, 1)

    }
}

const gb = new Gameboard({ x: 0, y: 0 }, ctx, "white", 21, 10, 15)
gb.drawGameboard();
gb.startGame();