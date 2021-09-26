class OPiece extends Tetromino {
    returnOccupiedCells(handlePoint) {
        const deltas = [
            [0, 0], [1, 0],
            [0, 1], [1, 1]
        ];

        return this.returnOccupieBasedDeltas(handlePoint, deltas);
    }
}

class IPiece extends Tetromino {
    returnOccupiedCells(handlePoint) {
        const deltas = [
            [0, 0], 
            [1, 0],
            [2, 0], 
            [3, 0]
        ];

        return this.returnOccupieBasedDeltas(handlePoint, deltas);
    }
}

class LPiece extends Tetromino {
    returnOccupiedCells(handlePoint) {
        const deltas = [
            [0, 0], 
            [0, 1],
            [0, 2], [1, 2]
        ];

        return this.returnOccupieBasedDeltas(handlePoint, deltas);
    }
}

class JPiece extends Tetromino {
    returnOccupiedCells(handlePoint) {
        const deltas = [
                    [0, 0], 
                    [0, 1],
            [-1, 2],[0, 2]
        ];

        return this.returnOccupieBasedDeltas(handlePoint, deltas);
    }
}

class TPiece extends Tetromino {
    returnOccupiedCells(handlePoint) {
        const deltas = [
            [0, 0], [1, 0],[2, 0],
                    [1, 1]
        ];

        return this.returnOccupieBasedDeltas(handlePoint, deltas); 
    }
}

class SPiece extends Tetromino {
    returnOccupiedCells(handlePoint) {
        const deltas = [
                     [0, 0], [1, 0],
            [-1, 1], [0, 1]
        ];

        return this.returnOccupieBasedDeltas(handlePoint, deltas); 
    }
}

class ZPiece extends Tetromino {
    returnOccupiedCells(handlePoint) {
        const deltas = [
            [0, 0], [1, 0],
                    [1, 1], [2, 1]
        ];

        return this.returnOccupieBasedDeltas(handlePoint, deltas); 
    }
}

