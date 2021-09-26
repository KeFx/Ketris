class IPiece {
    constructor(originHandlePoint, context, baseUnitSideLength, bgColor, eraseColor) {
        this.handlePoint = originHandlePoint;
        this.c = context;
        this.baseUnitSideLength = baseUnitSideLength;
        this.bgColor = bgColor;
        this.eraseColor = eraseColor; 

    }

    fillShapeWithColor(color) {
        drawRect(this.c, this.handlePoint.x, this.handlePoint.y,
            this.baseUnitSideLength,
            this.baseUnitSideLength * 4,
            color)
    }

    eraseSelf() {
        this.fillShapeWithColor(this.eraseColor);
    }

    display() {
        this.fillShapeWithColor(this.bgColor);
    }

    returnCellsAfterDrop(handlePoint) {
        return [
            {x: handlePoint.x, y: handlePoint.y + 1},{x: handlePoint.x + 1, y: handlePoint.y + 1},
            {x: handlePoint.x + 2, y: handlePoint.y + 1},{x: handlePoint.x + 3, y: handlePoint.y + 1}
        ];
    }

    returnCellsAfterMoveRight(handlePoint) {
        return [
            {x: handlePoint.x + 1, y: handlePoint.y},{x: handlePoint.x + 2, y: handlePoint.y},
            {x: handlePoint.x + 3, y: handlePoint.y},{x: handlePoint.x + 4, y: handlePoint.y}
        ];
    }

    returnCellsAfterMoveLeft(handlePoint) {
        return [
            {x: handlePoint.x - 1, y: handlePoint.y},{x: handlePoint.x, y: handlePoint.y},
            {x: handlePoint.x + 1, y: handlePoint.y},{x: handlePoint.x + 2, y: handlePoint.y}
        ];
    }

    returnOccupiedCells(handlePoint) {
        return [
            {x: handlePoint.x, y: handlePoint.y},{x: handlePoint.x + 1, y: handlePoint.y},
            {x: handlePoint.x + 2, y: handlePoint.y},{x: handlePoint.x + 3, y: handlePoint.y}
        ];
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