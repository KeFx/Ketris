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

    occupyCells(handlePoint, shape) {
        shape.returnOccupiedCells(handlePoint).forEach(cell => this.grid[cell.y][cell.x] = true);
    }

    hasConflicts(occupiedCells, movement) {
        for (const cell of occupiedCells) {
            switch(movement){
                case "down": if(cell.y >= this.rows) {return true;} break;
                case "right": if(cell.x >= this.cols) {return true;} break;
                case "left": if(cell.x < 0) {return true;} break;
            }

            if (this.grid[cell.y][cell.x]) {
                return true;
            }
        }

        return false;
    }

    canMoveDown(currentPos, shape) {
        const shapeOccupation = shape.returnCellsAfterDrop(shape.returnOccupiedCells(currentPos));
        return !this.hasConflicts(shapeOccupation, "down");
    }

    canMoveLeft(currentPos, shape) {
        const shapeOccupation = shape.returnCellsAfterMoveLeft(shape.returnOccupiedCells(currentPos));
        return !this.hasConflicts(shapeOccupation, "left");
    }

    canMoveRight(currentPos, shape) {
        const shapeOccupation = shape.returnCellsAfterMoveRight(shape.returnOccupiedCells(currentPos));
        return !this.hasConflicts(shapeOccupation, "right");
    }

    newShape(currentSquarePos){
        
        switch (getRandomInt(7)) {
            case 0: return new IPiece(
                currentSquarePos,
                this.c, this.baseUnitSideLength, "lightblue", this.bgColor);
            case 1:return new OPiece(
                currentSquarePos,
                this.c, this.baseUnitSideLength, "#adff2f", this.bgColor);
            case 2:return new LPiece(
                currentSquarePos,
                this.c, this.baseUnitSideLength, "#ffae8c", this.bgColor);
            case 3:return new JPiece(
                currentSquarePos,
                this.c, this.baseUnitSideLength, "#4e63e6", this.bgColor);
            case 4:return new TPiece(
                currentSquarePos,
                this.c, this.baseUnitSideLength, "#c585f7", this.bgColor);
            case 5:return new SPiece(
                currentSquarePos,
                this.c, this.baseUnitSideLength, "#c585f7", this.bgColor);
            case 6:return new ZPiece(
                currentSquarePos,
                this.c, this.baseUnitSideLength, "#c585f7", this.bgColor);    
        }
    }

    startGame() {
        const START_POS = { x: 4, y: 0 };
        let currentSquarePos = { ...START_POS };

        let currentActiveSquare = this.newShape(currentSquarePos);

        currentActiveSquare.display();

        window.onkeydown = (e) => {
            let key = e.key || e.keyCode;
            switch (key) {

                case "ArrowDown": case "s":
                    if (this.canMoveDown(currentSquarePos, currentActiveSquare)) {
                        currentActiveSquare.drop();
                        currentSquarePos.y++;
                    };
                    break;

                case "ArrowLeft": case "a":
                    if (this.canMoveLeft(currentSquarePos, currentActiveSquare)) {
                        currentActiveSquare.left();
                        currentSquarePos.x--;
                    };
                    break;

                case "ArrowRight": case "d":
                    if (this.canMoveRight(currentSquarePos, currentActiveSquare)) {
                        currentActiveSquare.right();
                        currentSquarePos.x++;
                    };
                    break;
                
                case "ArrowUp": case "w":
                    if (this.canMoveRight(currentSquarePos, currentActiveSquare)) {
                        currentActiveSquare.turn();
                        currentSquarePos.x++;
                    };
                    break;

            }
        }

        const gInterval = setInterval(() => {
            if (this.canMoveDown(currentSquarePos, currentActiveSquare)) {
                currentActiveSquare.drop();
                currentSquarePos.y++
            } else {
                this.occupyCells(currentSquarePos, currentActiveSquare);

                currentSquarePos = { ...START_POS };
                currentActiveSquare = this.newShape(currentSquarePos);

                currentActiveSquare.display();
            }
        },
            200);
    }
}

const gb = new Gameboard({ x: 0, y: 0 }, ctx, "white", 21, 10, 15)
gb.drawGameboard();
gb.startGame();