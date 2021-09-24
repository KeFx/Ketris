class Square {
    constructor(origin, context, baseUnitSideLength, bgColor, eraseColor) {
        this.o = origin;
        this.c = context;
        this.baseUnitSideLength = baseUnitSideLength;
        this.bgColor = bgColor;
        this.eraseColor = eraseColor;
    }

    eraseSelf() {
        drawRect(this.c, this.o.x, this.o.y,
            this.baseUnitSideLength,
            this.baseUnitSideLength,
            this.eraseColor)
    }

    display() {
        drawRect(this.c, this.o.x, this.o.y,
            this.baseUnitSideLength,
            this.baseUnitSideLength,
            this.bgColor)
    }

    moveTo(destCood) {
        this.eraseSelf();
        this.o = destCood;
        this.display();
    }

    drop() {
       this.moveTo({
           x: this.o.x,
           y: this.o.y + this.baseUnitSideLength
       });
    }

    left() {
        this.moveTo({
            x: this.o.x - this.baseUnitSideLength,
            y: this.o.y
        });
    }

    right() {
        this.moveTo({
            x: this.o.x + this.baseUnitSideLength,
            y: this.o.y
        });
    }

}