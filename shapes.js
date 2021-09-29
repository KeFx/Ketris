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
    postures(){
        return [
            ['0000',
             '1111',
             '0000',
             '0000'],

             ['0010',
              '0010',
              '0010', 
              '0010'],

             ['0000',
              '0000',
              '1111',
              '0000'],

             ['0100',
              '0100',
              '0100',
              '0100'],
        ];
    }

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
            [0, -1], 
            [0,  0],
            [0,  1],[1,  1]
        ];

        return this.returnOccupieBasedDeltas(handlePoint, deltas);
    }
}

class JPiece extends Tetromino {
    returnOccupiedCells(handlePoint) {
        const deltas = [
                    [0, -1], 
                    [0,  0],
            [-1, 1],[0,  1]
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

