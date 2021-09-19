'use strict';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("Gameboard");
const ctx = canvas.getContext("2d");

const GS_HEIGHT = 350;
const GS_WIDTH = 200;
const GS_BACKGROUND = "white";

drawGamespace(ctx, GS_HEIGHT, GS_WIDTH, GS_BACKGROUND);

let pos = 0;
let lastPos = pos;

moveSquare()

setInterval(function () {
    lastPos = pos;
    pos += 20;
    moveSquare();
}, 500);

function moveSquare() {
    drawSquare(ctx, (canvas.width) / 2, lastPos-5, 25, 50, "white");
    drawSquare(ctx, (canvas.width) / 2, pos, 50, 50, "lightblue");
}

function drawSquare(c, x, y, height, width, background) {
    c.save();
    c.beginPath();
    c.fillStyle = background;

    c.rect(x, y, width, height);
    c.fill();
    c.restore();
}

function drawGamespace(c, height, width , background) {
    c.save();
    c.beginPath();
    c.fillStyle = background;

    c.rect(0, 0, width, height);
    c.fill();
    c.restore();
};

