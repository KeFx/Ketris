function drawRect(c, x, y, height, width, background) {
    c.save();
    // console.log(`x: ${x}, y: ${y}, height: ${height}, width: ${width}, background: ${background}`);
    c.fillStyle = background;
    c.fillRect(x, y, width, height);

    c.restore();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}