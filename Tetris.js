'use strict';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("Gameboard");
const ctx = canvas.getContext("2d");

drawGamespace(ctx);

let pos = 100;
let lastPos = pos;

moveSquare()
setInterval(function () {
    lastPos = pos;
    pos += 15;
    moveSquare();
}, 800);


function moveSquare() {
    drawSquare(ctx, (canvas.width) / 2, lastPos, 15, 50, "white");
    drawSquare(ctx, (canvas.width) / 2, pos, 50, 50, "lightblue");
}

function drawGamespace(c, height, width, background) {
    height = height || 350;
    width = width || 200;
    background = background || 'white';

    c.save();
    c.beginPath();
    c.fillStyle = background;

    c.rect((canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    c.fill();
};

function drawSquare(c, x, y, height, width, background) {
    
    c.save();
    c.beginPath();
    c.fillStyle = background;

    c.rect(x, y, width, height);
    c.fill();
}

