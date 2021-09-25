class OPiece {
    constructor(originHandlePoint, context, baseUnitSideLength, bgColor, eraseColor) {
        this.handlePoint = originHandlePoint;
        this.c = context;
        this.baseUnitSideLength = baseUnitSideLength;
        this.bgColor = bgColor;
        this.eraseColor = eraseColor; 

    }

    eraseSelf() {
        drawRect(this.c, this.handlePoint.x, this.handlePoint.y,
            this.baseUnitSideLength * 2,
            this.baseUnitSideLength * 2,
            this.eraseColor)
    }

    display() {
        drawRect(this.c, this.handlePoint.x, this.handlePoint.y,
            this.baseUnitSideLength  * 2,
            this.baseUnitSideLength * 2,
            this.bgColor)
    }

    returnCellsAfterDrop(handlePoint) {
        return [
            {x: handlePoint.x, y: handlePoint.y + 1},{x: handlePoint.x + 1, y: handlePoint.y + 1},
            {x: handlePoint.x, y: handlePoint.y + 2},{x: handlePoint.x + 1, y: handlePoint.y + 2}
        ];
    }

    returnCellsAfterMoveRight(handlePoint) {
        return [
            {x: handlePoint.x + 1, y: handlePoint.y},{x: handlePoint.x + 2, y: handlePoint.y},
            {x: handlePoint.x + 1, y: handlePoint.y + 1},{x: handlePoint.x + 2, y: handlePoint.y + 1}
        ];
    }

    returnCellsAfterMoveLeft(handlePoint) {
        return [
            {x: handlePoint.x - 1, y: handlePoint.y},{x: handlePoint.x, y: handlePoint.y},
            {x: handlePoint.x - 1, y: handlePoint.y + 1},{x: handlePoint.x, y: handlePoint.y + 1}
        ];
    }

    returnOccupiedCells(handlePoint) {
        return [
            {x: handlePoint.x, y: handlePoint.y},{x: handlePoint.x + 1, y: handlePoint.y},
            {x: handlePoint.x, y: handlePoint.y + 1},{x: handlePoint.x + 1, y: handlePoint.y + 1}
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