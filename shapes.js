class OPiece extends Tetromino {
    postures(){
        return [
            ['0110',
             '0110',
             '0000',
             '0000'],

             ['0110',
             '0110',
             '0000',
             '0000'],

             ['0110',
             '0110',
             '0000',
             '0000'],

             ['0110',
             '0110',
             '0000',
             '0000'],
        ];
    }

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

}

class LPiece extends Tetromino {
    postures(){
        return [
            ['001',
             '111',
             '000'],

            ['010',
             '010',
             '011'],

            ['000',
             '111',
             '100'],

            ['110',
             '010',
             '010'],
        ];
    }
}

class JPiece extends Tetromino {
    postures(){
        return [
            ['100',
             '111',
             '000'],

            ['011',
             '010',
             '010'],

             ['111',
              '001',
              '000'],

            ['010',
             '010',
             '110'],
        ];
    }
}

class TPiece extends Tetromino {
    postures(){
        return [
            ['010',
             '111',
             '000'],

            ['010',
             '011',
             '010'],

            ['000',
             '111',
             '010'],

             ['010',
              '110',
              '010'],
        ];
    }
}

class SPiece extends Tetromino {
    postures(){
        return [
            ['011',
             '110',
             '000'],

            ['010',
             '011',
             '001'],

            ['000',
             '011',
             '110'],

             ['100',
              '110',
              '010'],
        ];
    }
}

class ZPiece extends Tetromino {
    postures(){
        return [
            ['110',
             '011',
             '000'],

            ['001',
             '011',
             '010'],

            ['000',
             '110',
             '011'],

             ['010',
              '110',
              '100'],
        ];
    }
}

