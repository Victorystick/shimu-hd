
export class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  scale(n) {
    this.x *= n;
    this.y *= n;
  }

  normalize() {
    this.scale(1 / this.length());
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

Vec2.ZERO = Object.freeze(new Vec2(0, 0));

export class Size {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}
