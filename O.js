class OPiece {
    constructor(origin, context, baseUnitSideLength, bgColor, eraseColor) {
        this.o = origin;
        this.c = context;
        this.baseUnitSideLength = baseUnitSideLength;
        this.bgColor = bgColor;
        this.eraseColor = eraseColor; 

    }

    eraseSelf() {
        drawRect(this.c, this.o.x, this.o.y,
            this.baseUnitSideLength * 2,
            this.baseUnitSideLength * 2,
            this.eraseColor)
    }

    display() {
        drawRect(this.c, this.o.x, this.o.y,
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

    returnOccupiedCells(handlePoint) {
        return [
            {x: handlePoint.x, y: handlePoint.y},{x: handlePoint.x + 1, y: handlePoint.y},
            {x: handlePoint.x, y: handlePoint.y + 1},{x: handlePoint.x + 1, y: handlePoint.y + 1}
        ];
    }

    moveTo(destCood) {
        this.eraseSelf();
        this.o = destCood;
        this.display();
    }

    drop() {
        this.moveTo({
            x: this.o.x,
            y: this.o.y + this.baseUnitSideLength
        });
    }

    left() {
        this.moveTo({
            x: this.o.x - this.baseUnitSideLength,
            y: this.o.y
        });
    }

    right() {
        this.moveTo({
            x: this.o.x + this.baseUnitSideLength,
            y: this.o.y
        });
    }

}