import {Vec2, Size} from "../core";

export interface DirectedEntity extends Entity {
  getFaceDirection(): Vec2;
}

export class Entity {
  public position: Vec2;
  public size: Size;
  public color: string;

  constructor(position : Vec2, size: Size, color?: string) {
    this.position = position;
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    const { width, height } = this.size;
    ctx.fillStyle = String(this.color);
    ctx.fillRect(this.position.x - width/2, this.position.y - height/2, width, height);
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
