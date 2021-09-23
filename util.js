function drawRect(c, x, y, height, width, background) {
    c.save();
    c.beginPath();
    c.fillStyle = background;

    c.rect(x, y, width, height);
    c.fill();
    c.restore();
}