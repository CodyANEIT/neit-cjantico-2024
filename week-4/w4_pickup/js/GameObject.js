class GameObject {
    constructor() {
        this.x = c.width / 2;
        this.y = c.height / 2;
        this.angle = 0;
        this.w = 100;
        this.h = 100;
        this.vx = 0;
        this.vy = 0;
        this.color = `hotpink`;
    }

    render() {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
    }

    move() {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    top() { return this.y - this.h / 2; }
    bottom() { return this.y + this.h / 2; }
    left() { return this.x - this.w / 2; }
    right() { return this.x + this.w / 2; }

    overlaps(_obj) {
        return (
            this.top() < _obj.bottom() &&
            this.bottom() > _obj.top() &&
            this.left() < _obj.right() &&
            this.right() > _obj.left()
        );
    }
}
