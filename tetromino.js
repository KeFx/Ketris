class Tetromino {
    constructor(originCellHandlePoint, context, baseUnitSideLength, bgColor, eraseColor) {
        this.currentCellHandlePoint = originCellHandlePoint;
        this.c = context;
        this.baseUnitSideLength = baseUnitSideLength;
        this.bgColor = bgColor;
        this.eraseColor = eraseColor;

    }

    fillShapeWithColor(color, occupiedCells) {
        occupiedCells.forEach(c => {
            drawRect(this.c, c.x * this.baseUnitSideLength, c.y * this.baseUnitSideLength,
                this.baseUnitSideLength,
                this.baseUnitSideLength,
                color)
        });
    }

    eraseSelf() {
        this.fillShapeWithColor(this.eraseColor, this.returnOccupiedCells(this.currentCellHandlePoint));
    }

    display() {
        this.fillShapeWithColor(this.bgColor, this.returnOccupiedCells(this.currentCellHandlePoint));
    }

    returnCellsAfterDrop(occupiedCells) {
        return occupiedCells.map(c => ({ x: c.x, y: c.y + 1 }));
    }

    returnCellsAfterMoveRight(occupiedCells) {
        return occupiedCells.map(c => ({ x: c.x + 1, y: c.y }));
    }

    returnCellsAfterMoveLeft(occupiedCells) {
        return occupiedCells.map(c => ({ x: c.x - 1, y: c.y }));
    }

    returnOccupiedCells(handlePoint) {
        throw new Error("Please override this function.");
    }

    moveTo(destCood) {
        this.eraseSelf();
        this.currentCellHandlePoint = destCood;
        this.display();
    }

    drop() {
        this.moveTo({
            x: this.currentCellHandlePoint.x,
            y: this.currentCellHandlePoint.y + 1
        });
    }

    left() {
        this.moveTo({
            x: this.currentCellHandlePoint.x - 1,
            y: this.currentCellHandlePoint.y
        });
    }

    right() {
        this.moveTo({
            x: this.currentCellHandlePoint.x + 1,
            y: this.currentCellHandlePoint.y
        });
    }
}