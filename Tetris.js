'use strict';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("Gameboard");
const ctx = canvas.getContext("2d");

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
            this.c, this.baseUnitSideLength, "lightblue",this.bgColor);

        s1.display();

        setInterval(function() {
                        if ( !s1.hasCollide({x:0, y:315}) ){
                            s1.drop();
                        }
                    },
         600);
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

    hasCollide(obstacle) {
        return (this.o.y + this.baseUnitSideLength === obstacle.y);
    }
}

const gb = new Gameboard({ x: 0, y: 0 }, ctx, "white", 21, 10, 15)
gb.drawGameboard();
gb.startGame();

function drawRect(c, x, y, height, width, background) {
    c.save();
    c.beginPath();
    c.fillStyle = background;

    c.rect(x, y, width, height);
    c.fill();
    c.restore();
}