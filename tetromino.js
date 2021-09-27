class Tetromino {
    constructor(originCellHandlePoint, context, baseUnitSideLength, bgColor, eraseColor) {
        this.c = context;
        this.baseUnitSideLength = baseUnitSideLength;
        this.bgColor = bgColor;
        this.eraseColor = eraseColor;
        this.currentCells = this.returnOccupiedCells(originCellHandlePoint);
    }

    fillShapeWithColor(color, occupiedCells) {
        occupiedCells.forEach(c => {
            drawRect(this.c, c.x * this.baseUnitSideLength, c.y * this.baseUnitSideLength,
                this.baseUnitSideLength,
                this.baseUnitSideLength,
                color)
        });
    }

    returnOccupieBasedDeltas(handlePoint, deltas) {
        return deltas.map(d => ({x: handlePoint.x + d[0], y: handlePoint.y + d[1]}));
    }

    eraseSelf() {
        this.fillShapeWithColor(this.eraseColor, this.currentCells);
    }

    display() {
        this.fillShapeWithColor(this.bgColor, this.currentCells);
    }

    returnCellsAfterDrop() {
        return this.currentCells.map(c => ({ x: c.x, y: c.y + 1 }));
    }

    returnCellsAfterMoveRight() {
        return this.currentCells.map(c => ({ x: c.x + 1, y: c.y }));
    }

    returnCellsAfterMoveLeft() {
        return this.currentCells.map(c => ({ x: c.x - 1, y: c.y }));
    }

    returnCellsAfterTurn() {
        return(this.currentCells).map(c => ({ x: c.y, y: c.x }));
    }

    returnOccupiedCells(handlePoint) {
        throw new Error("Please override this function.");
    }

    redraw(cells) {
        this.eraseSelf();
        this.currentCells = cells;
        this.display();
    }

    drop() {
        this.redraw(this.returnCellsAfterDrop(this.currentCells));
    }

    left() {
        this.redraw(this.returnCellsAfterMoveLeft(this.currentCells));
    }

    right() {
        this.redraw(this.returnCellsAfterMoveRight(this.currentCells));
    }

    turn() {
        // this.redraw(this.returnCellsAfterTurn(this.currentCells));
    }
}