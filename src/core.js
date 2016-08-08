
export class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vec2(this.x, this.y);
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
    return this.setLength(1);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  setLength(n) {
    return this.scale(n / this.length());
  }
}

Vec2.ZERO = Object.freeze(new Vec2(0, 0));

export class Size {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  static from(other) {
    return new Size(other.width, other.height);
  }
}
