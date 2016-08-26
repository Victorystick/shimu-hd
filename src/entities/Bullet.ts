import {Vec2, Size} from '../core';
import {Entity} from './Entity';

const size = new Size(2, 2);

export class Bullet extends Entity {
  public direction: Vec2;
  public speed: number;
  public owner: Entity;

  constructor(position: Vec2, direction: Vec2, owner: Entity) {
    super(position, size, 'white');
    this.direction = direction;
    this.speed = direction.length();
    this.owner = owner;
  }

  update(game, delta) {
    this.position.add(this.direction.setLength(delta * this.speed));

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

export class PlasmaBullet extends Bullet {
  public heat: number;
  constructor(position, direction, owner) {
    super(position, direction, owner)
    this.heat = 900;
    this.color = 'orange';
    this.size = new Size(4, 4);
    this.speed /= 5;
  }

  update(game, delta) {
    this.heat -= delta;
    this.checkHeat(game);
    super.update(game, delta)
  }

  hits(entity) {
    if (entity instanceof PlasmaBullet) return false;

    return super.hits(entity);
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
