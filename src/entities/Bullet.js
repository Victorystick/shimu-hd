import {Size} from '../core.js';
import {Entity} from './Entity.js';

const size = new Size(2, 2);

export class Bullet extends Entity {
  constructor(position, direction, owner) {
    super(position, size, 'white');
    this.direction = direction;
    this.speed = direction.length();
    this.owner = owner;
  }

  update(game, delta) {
    this.position.add(this.direction.setLength(delta * this.speed));

    // Check to see if the bullet hits any other entity.
    const other = game.entities.find(this.hits, this);

    // If it does, remove both.
    if (other) {
      game.remove(other);
      game.remove(this);
      return;
    }

    if (!game.getBoard().intersects(this)) {
      game.remove(this);
    }
  }

  // A bullet is assumed to hit an entity, if it isn't the bullet itself nor
  // its owner and the two intersect each other.
  hits(entity) {
    if (entity === this || entity === this.owner) return false;

    return this.intersects(entity);
  }
}

export class LineBullet extends Bullet {
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = String(this.color);
    ctx.moveTo(this.position.x, this.position.y);

    const prev = this.direction.clone().negate().add(this.position);
    ctx.lineTo(prev.x, prev.y);
    ctx.stroke();
  }
}
