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
    
    left() {
        drawRect(this.c, this.o.x, this.o.y,
            this.baseUnitSideLength,
            this.baseUnitSideLength,
            this.eraseColor)

        this.o.x -= this.baseUnitSideLength;

        drawRect(this.c, this.o.x, this.o.y,
            this.baseUnitSideLength,
            this.baseUnitSideLength,
            this.bgColor)
    }

    right() {
        drawRect(this.c, this.o.x, this.o.y,
            this.baseUnitSideLength,
            this.baseUnitSideLength,
            this.eraseColor)

        this.o.x += this.baseUnitSideLength;

        drawRect(this.c, this.o.x, this.o.y,
            this.baseUnitSideLength,
            this.baseUnitSideLength,
            this.bgColor)
    }

}