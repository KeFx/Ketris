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
        this.pocket = [0, 1, 2, 3, 4, 5, 6];
    }

    newEmptyGrid() {
        const g = new Array(this.rows);
        for (let i = 0; i < g.length; i++) {
            g[i] = new Array(this.cols)
            for (let j = 0; j < g[i].length; j++) {
                g[i][j] = "white";
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

    newEmptyRow() {
        let newEmptyRow =[];
        for (let c = 0; c < this.cols; c++) {
            newEmptyRow.push("white")
        }
        return newEmptyRow; 
    }

    isRowFull(row) {
        return row.every(c => c != 'white');
    }

    updateGridIfRowFull() {
        this.grid.forEach((row, i) => {
            if (this.isRowFull(row)) {
                this.grid.splice(i, 1);
                this.grid.unshift(this.newEmptyRow());
                this.redrawGrid()
            }
        })
        
    }

    redrawGrid() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                drawRect(this.c, col * this.baseUnitSideLength, row * this.baseUnitSideLength,
                    this.baseUnitSideLength,
                    this.baseUnitSideLength,
                    this.grid[row][col])
            }
        }
    }

    occupyCells(shape, color) {
        shape.currentCells.forEach(cell => this.grid[cell.y][cell.x] = color);
    }

    hasConflicts(occupiedCells, movement) {
        for (const cell of occupiedCells) {
            switch (movement) {
                case "down": if (cell.y >= this.rows) { return true; } break;
                case "right": if (cell.x >= this.cols) { return true; } break;
                case "left": if (cell.x < 0) { return true; } break;
                case "turn": if (cell.x >= this.cols || cell.x < 0 || cell.y >= this.rows) { return true; } break;
            }

            if (this.grid[cell.y][cell.x] != "white") {
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

    canTurn(shape) {
        const shapeOccupation = shape.returnCellsAfterTurn();
        return !this.hasConflicts(shapeOccupation, "turn");
    }

    getNextInPocket() {
        if (this.pocket.length === 0) {
            this.pocket.push(0, 1, 2, 3, 4, 5, 6);
        };
        return this.pocket.splice(getRandomInt(this.pocket.length), 1)[0];
    }

    newShape(originCellHandlePoint) {
        switch (this.getNextInPocket()) {
            // switch (1) {
            case 0: return new IPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "lightblue", this.bgColor);
            case 1: return new OPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "#edf55f", this.bgColor);
            case 2: return new LPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "#f5a651", this.bgColor);
            case 3: return new JPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "#7788f2", this.bgColor);
            case 4: return new TPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "#c585f7", this.bgColor);
            case 5: return new SPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "#84f094", this.bgColor);
            case 6: return new ZPiece(
                originCellHandlePoint,
                this.c, this.baseUnitSideLength, "#f08487", this.bgColor);
        }
    }

    startGame() {
        const START_POS = { x: 4, y: 0 };
        let currentActiveSquare = this.newShape(START_POS);
        currentActiveSquare.display();

        const moveDown = () => { 
            if (this.canMoveDown(currentActiveSquare)) {
                currentActiveSquare.drop(); 
            }

                if (!this.canMoveDown(currentActiveSquare)) {
                    this.occupyCells(currentActiveSquare, currentActiveSquare.bgColor);
                    this.updateGridIfRowFull();
                    currentActiveSquare = this.newShape(START_POS);
                    currentActiveSquare.display();
                }
        }

        const moveLeft = () => { this.canMoveLeft(currentActiveSquare) && currentActiveSquare.left(); }
        const moveRight = () => { this.canMoveRight(currentActiveSquare) && currentActiveSquare.right(); }
        const rotate = () => { this.canTurn(currentActiveSquare) && currentActiveSquare.turn(); }

        const activeActions = new Set();
        
        let isRotationKeyFreshlyPressed = true;

        window.onkeydown = (ev) => {
            let key = ev.key || ev.keyCode;
            switch (key) {
                case "ArrowDown": case "s":
                    activeActions.add(moveDown);
                    break;

                case "ArrowLeft": case "a":
                    activeActions.add(moveLeft);
                    break;

                case "ArrowRight": case "d":
                    activeActions.add(moveRight);
                    break;

                case "ArrowUp": case "w":
                    if(isRotationKeyFreshlyPressed){
                        rotate();
                        isRotationKeyFreshlyPressed = false;
                    }
                    break;
            }
            activeActions.forEach(f => f());
        }

        window.onkeyup = (ev) => {
            let key = ev.key || ev.keyCode;
            switch (key) {
                case "ArrowDown": case "s":
                    activeActions.delete(moveDown);
                    break;

                case "ArrowLeft": case "a":
                    activeActions.delete(moveLeft);
                    break;

                case "ArrowRight": case "d":
                    activeActions.delete(moveRight);
                    break;

                case "ArrowUp": case "w":
                    isRotationKeyFreshlyPressed = true;
                    break;
            }
        }   

        const gInterval = setInterval(() => {
            if (this.canMoveDown(currentActiveSquare)) {
                currentActiveSquare.drop();
            } 
            
            if (!this.canMoveDown(currentActiveSquare)) {
                this.occupyCells(currentActiveSquare, currentActiveSquare.bgColor);
                this.updateGridIfRowFull();
                currentActiveSquare = this.newShape(START_POS);
                currentActiveSquare.display();
            }
        }, 500);
        
        setInterval(() => {
            window.scroll(0, 10);
            window.scroll(0, 11);
        }, 1)
    }
}

const gb = new Gameboard({ x: 0, y: 0 }, ctx, "white", 21, 10, 15)
gb.drawGameboard();
gb.startGame();