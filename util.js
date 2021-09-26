function drawRect(c, x, y, height, width, background) {
    c.save();

    c.fillStyle = background;
    c.fillRect(x, y, width, height);

    c.restore();
}