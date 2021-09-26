class IPiece extends Tetromino {
    fillShapeWithColor(color) {
        drawRect(this.c, this.handlePoint.x, this.handlePoint.y,
            this.baseUnitSideLength,
            this.baseUnitSideLength * 4,
            color)
    }

    returnOccupiedCells(handlePoint) {
        return [
            {x: handlePoint.x, y: handlePoint.y},{x: handlePoint.x + 1, y: handlePoint.y},
            {x: handlePoint.x + 2, y: handlePoint.y},{x: handlePoint.x + 3, y: handlePoint.y}
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


}