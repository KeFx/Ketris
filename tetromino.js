class Tetromino {
    constructor(originHandlePoint, context, baseUnitSideLength, bgColor, eraseColor) {
        this.handlePoint = originHandlePoint;
        this.c = context;
        this.baseUnitSideLength = baseUnitSideLength;
        this.bgColor = bgColor;
        this.eraseColor = eraseColor; 

    }

    fillShapeWithColor(color) {
        throw new Error("Please override this function.");
    }

    eraseSelf() {
        this.fillShapeWithColor(this.eraseColor);
    }

    display() {
        this.fillShapeWithColor(this.bgColor);
    }

    returnCellsAfterDrop(occupiedCells) {
        return occupiedCells.map(c => ({x:c.x, y:c.y + 1}));
    }

    returnCellsAfterMoveRight(handlePoint) {
        throw new Error("Please override this function.");
    }

    returnCellsAfterMoveLeft(handlePoint) {
        throw new Error("Please override this function.");
    }

    returnOccupiedCells(handlePoint) {
        throw new Error("Please override this function.");
    }

    moveTo(destCood) {
        this.eraseSelf();
        this.handlePoint = destCood;
        this.display();
    }

    drop() {
        this.moveTo({
            x: this.handlePoint.x,
            y: this.handlePoint.y + this.baseUnitSideLength
        });
    }

    left() {
        this.moveTo({
            x: this.handlePoint.x - this.baseUnitSideLength,
            y: this.handlePoint.y
        });
    }

    right() {
        this.moveTo({
            x: this.handlePoint.x + this.baseUnitSideLength,
            y: this.handlePoint.y
        });
    }

}