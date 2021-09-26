class OPiece extends Tetromino {
    fillShapeWithColor(color) {
        drawRect(this.c, this.handlePoint.x, this.handlePoint.y,
            this.baseUnitSideLength * 2,
            this.baseUnitSideLength * 2,
            color)
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
}