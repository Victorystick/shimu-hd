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
      if (this.onCollision(game, other)) {
        return;
      }
    }

    if (!game.getBoard().intersects(this)) {
      game.remove(this);
    }
  }

  onCollision(game, other) {
      game.remove(other);
      game.remove(this);
      return true;
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

export class PlasmaBullet extends Bullet {
  constructor(position, direction, owner) {
    super(position, direction, owner)
    this.heat = 90;
    this.color = 'orange';
    this.size = new Size(4, 4);
    this.speed /= 5;
  }

  update(game, delta) {
    this.heat -= delta;
    this.checkHeat(game);
    super.update(game, delta)
  }

  onCollision(game, other) {
    if (other.hp) {
      this.heat -= other.hp*9;
    } else {
      this.heat -= 10;
    }
    game.remove(other);
    return this.checkHeat(game);
  }

  checkHeat(game) {
    if (this.heat <= 0) {
      game.remove(this);
      return true;
    }
    return false;
  }

  draw(ctx) {
    const { width, height } = this.size;
    ctx.fillStyle = String(this.color);
    for(var i = 6; i> 0; i--) {
      const randX = 6*Math.random()-3;
      const randY = 6*Math.random()-3;
      ctx.fillRect(randX+this.position.x - width/2, randY+this.position.y - height/2, width, height);
    }
  }
}
