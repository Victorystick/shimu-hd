
export class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Adds vectors `a` and `b`, returning a new vector.
  static add(a, b) {
    return new Vec2(a.x + b.x, a.y + b.y);
  }

  // Adds the `other` vector to this.
  add(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  // Subtracts vector `b` from `a`, returning a new vector.
  static sub(a, b) {
    return new Vec2(a.x - b.x, a.y - b.y);
  }

  // Subtracts the `other` vector from this.
  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  scale(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }

  normalize() {
    this.scale(1 / this.length());
    return this;
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
