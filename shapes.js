class OPiece extends Tetromino {
    returnOccupiedCells(handlePoint) {
        return [
            {x: handlePoint.x, y: handlePoint.y},{x: handlePoint.x + 1, y: handlePoint.y},
            {x: handlePoint.x, y: handlePoint.y + 1},{x: handlePoint.x + 1, y: handlePoint.y + 1}
        ];
    }
}

class IPiece extends Tetromino {
    returnOccupiedCells(handlePoint) {
        return [
            {x: handlePoint.x, y: handlePoint.y},{x: handlePoint.x + 1, y: handlePoint.y},
            {x: handlePoint.x + 2, y: handlePoint.y},{x: handlePoint.x + 3, y: handlePoint.y}
        ];
    }
}

class LPiece extends Tetromino {
    returnOccupiedCells(handlePoint) {
        return [
            {x: handlePoint.x, y: handlePoint.y},{x: handlePoint.x, y: handlePoint.y + 1},
            {x: handlePoint.x, y: handlePoint.y + 2},{x: handlePoint.x + 1, y: handlePoint.y + 2}
        ];
    }
}

class TPiece extends Tetromino {
    returnOccupiedCells(handlePoint) {
        return [
            {x: handlePoint.x, y: handlePoint.y},{x: handlePoint.x + 1, y: handlePoint.y},
            {x: handlePoint.x + 2, y: handlePoint.y},{x: handlePoint.x + 1, y: handlePoint.y + 1}
        ];
    }
}