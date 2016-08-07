
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
}
