'use strict';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("Gameboard");
const ctx = canvas.getContext("2d");

const GS_HEIGHT = canvas.height;
const GS_WIDTH = canvas.width;
const GS_BACKGROUND = "white";

class Gameboard {
    constructor(origin, context, bgColor, rows, cols, baseUnitSideLength) {
        this.o = origin;
        this.c = context;
        this.bgColor = bgColor;
        this.rows = rows;
        this.cols = cols;
        this.baseUnitSideLength = baseUnitSideLength;
    }
    drawGameboard() {
        this.c.save();
        this.c.beginPath();
        this.c.fillStyle = this.bgColor;

        this.c.rect(this.o.x, this.o.y,
            this.cols * this.baseUnitSideLength,
            this.rows * this.baseUnitSideLength);
        this.c.fill();
        this.c.restore();
    }

    startGame() {
        const s1 = new Square(
            { x: (this.cols) * this.baseUnitSideLength / 2, y: 0 },
            this.c, this.baseUnitSideLength, "lightblue",
            this.bgColor);
        s1.display()
        s1.drop();
    }

}
class Square {
    constructor(origin, context, baseUnitSideLength, bgColor, eraseColor) {
        this.o = origin;
        this.c = context;
        this.baseUnitSideLength = baseUnitSideLength;
        this.bgColor = bgColor;
        this.eraseColor = eraseColor;
    }
    display() {
        drawRect(this.c, this.o.x, this.o.y,
            this.baseUnitSideLength,
            this.baseUnitSideLength,
            this.bgColor)
    }
    drop() {
        drawRect(this.c, this.o.x, this.o.y,
            this.baseUnitSideLength,
            this.baseUnitSideLength,
            this.eraseColor)

        this.o.y += this.baseUnitSideLength;

        drawRect(this.c, this.o.x, this.o.y,
            this.baseUnitSideLength,
            this.baseUnitSideLength,
            this.bgColor)
    }
}
// const GB_ORIGIN = {x: 0, y: 0};
// const GB_BACKGROUND_COLOR = "white";
// const GB_ROW = 10
// const GB_COLUMN = 40
// const BASE_UNIT


const gb = new Gameboard({ x: 0, y: 0 }, ctx, "white", 40, 20, 10)

gb.drawGameboard();
gb.startGame();


// const BASE_SQUARE_SIDE_LENGTH = 10

// let pos = 0;
// let lastPos = pos;
// let x = canvas.width / 2;
// let y = 0;

// y = dropSquareByPixel(x, y, BASE_SQUARE_SIDE_LENGTH, BASE_SQUARE_SIDE_LENGTH);

// setInterval(function () {
//     y = dropSquareByPixel(x, y, BASE_SQUARE_SIDE_LENGTH, BASE_SQUARE_SIDE_LENGTH);
// }, 600);

function dropSquareByPixel(x, y, size, dropPixel) {
    drawRect(ctx, x, y, dropPixel, size, "white");
    drawRect(ctx, x, y + dropPixel, size, size, "lightblue");
    return y + dropPixel;
}


function drawRect(c, x, y, height, width, background) {
    c.save();
    c.beginPath();
    c.fillStyle = background;

    c.rect(x, y, width, height);
    c.fill();
    c.restore();
}

function drawGamespace(c, height, width, background) {
    c.save();
    c.beginPath();
    c.fillStyle = background;

    c.rect(0, 0, width, height);
    c.fill();
    c.restore();
};