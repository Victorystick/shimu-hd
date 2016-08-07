
export class Entity {
  constructor(position, size, color) {
    this.position = position;
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = String(this.color);
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  }

  /**
   * @param {Game} game An instance of the main Game class.
   * @param {number} delta The time in milliseconds since the last update.
   */
  update(game, delta) {
    // No operation.
  }

  // Returns true if this Entity intersects the other.
  intersects(other) {
    const myRX = getRX(this);
    const theirRX = getRX(other);
    const myRY = getRY(this);
    const theirRY = getRY(other);

    return myRX < (theirRX + other.size.width) &&
      theirRX < (myRX + this.size.width) &&
			myRY < (theirRY + other.size.height) &&
      theirRY < (myRY + this.size.height);
  }
}

function getRX(entity) {
  return entity.position.x - entity.size.width / 2;
}

function getRY(entity) {
  return entity.position.y - entity.size.height / 2;
}
