class Tetromino {
    constructor(originCellHandlePoint, context, baseUnitSideLength, bgColor, eraseColor) {
        this.c = context;
        this.baseUnitSideLength = baseUnitSideLength;
        this.bgColor = bgColor;
        this.eraseColor = eraseColor;
        this.currentCells = this.returnOccupiedCells(originCellHandlePoint);
        this.currentPosture = 0;
    }

    fillShapeWithColor(color, occupiedCells) {
        occupiedCells.forEach(c => {
            drawRect(this.c, c.x * this.baseUnitSideLength, c.y * this.baseUnitSideLength,
                this.baseUnitSideLength,
                this.baseUnitSideLength,
                color)
        });
    }

    returnOccupieBasedDeltas(handlePoint, deltas) {
        return deltas.map(d => ({ x: handlePoint.x + d[0], y: handlePoint.y + d[1] }));
    }

    parsePosture(shape) {
        let coords = [];

        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < [...shape[y]].length; x++) {
                if (shape[y][x] === '1') {
                    coords.push([x, y]);
                }
            }
        }

        return coords;
    }

    returnDeltas(c1, c2) {
        let deltas = [];
        for (let e = 0; e <= c1.length - 1; e++) {
            deltas.push({ x: c1[e][0] - c2[e][0], y: c1[e][1] - c2[e][1] })
        }
        return deltas;
    }

    eraseSelf() {
        this.fillShapeWithColor(this.eraseColor, this.currentCells);
    }

    display() {
        this.fillShapeWithColor(this.bgColor, this.currentCells);
    }

    returnCellsAfterDrop() {
        return this.currentCells.map(c => ({ x: c.x, y: c.y + 1 }));
    }

    returnCellsAfterMoveRight() {
        return this.currentCells.map(c => ({ x: c.x + 1, y: c.y }));
    }

    returnCellsAfterMoveLeft() {
        return this.currentCells.map(c => ({ x: c.x - 1, y: c.y }));
    }

    returnCellsAfterTurn() {
        let pos1 = this.parsePosture(this.postures()[this.currentPosture]);
        const nextPostureIndex = (this.currentPosture + 1) % 4
        let pos2 =  this.parsePosture(this.postures()[nextPostureIndex]);;

        let deltas = this.returnDeltas(pos1, pos2);
        let cellsAfterTurn = [];

        for (let e = 0; e <= this.currentCells.length - 1; e++) {
            cellsAfterTurn.push({ x: this.currentCells[e].x - deltas[e].x, y: this.currentCells[e].y - deltas[e].y })
        }

        return cellsAfterTurn;
    }

    returnOccupiedCells(handlePoint) {
        return this.returnOccupieBasedDeltas(handlePoint, 
            this.parsePosture(this.postures()[0]));
    }

    redraw(cells) {
        this.eraseSelf();
        this.currentCells = cells;
        this.display();
    }

    drop() {
        this.redraw(this.returnCellsAfterDrop(this.currentCells));
    }

    left() {
        this.redraw(this.returnCellsAfterMoveLeft(this.currentCells));
    }

    right() {
        this.redraw(this.returnCellsAfterMoveRight(this.currentCells));
    }

    turn() {
        this.redraw(this.returnCellsAfterTurn(this.currentCells));
        this.currentPosture = (this.currentPosture + 1) % 4
    }
}