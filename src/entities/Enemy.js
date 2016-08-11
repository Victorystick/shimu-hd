import {Vec2, Size} from '../core.js';
import {Entity} from './Entity.js';

export class Enemy extends Entity {
  constructor(point, size, color, hp, speed) {
    super(point, size, color);
    this.hp = hp;
    this.speed = speed;
  }

  update(game, delta) {
    if (!game.player) return;

    const movement = Vec2.sub(game.player.position, this.position)
        .setLength(this.speed * delta);

    this.position.add(movement);
  }

  static standard(position, speed) {
    return new Enemy(position, new Size(5,5), 'yellow', 10, speed);
  }
}

export class Blob extends Enemy {
  update(game, delta) {
    if (!game.player) return;

    if (this.size.width + this.size.height > 40) {
      this.size.width -= delta*0.2;
      this.size.height -= delta*0.2;

      if (this.size.width < 20) {
        this.size.width = 20;
      }
      if (this.size.height < 20) {
        this.size.height = 20;
      }
    }

    const movement = Vec2.sub(
        game.entities.reduce(Blob.search.bind(this)).position, 
        this.position)
      .setLength(this.speed * delta);

    this.position.add(movement);

    const others = game.entities.filter(this.hits, this);
    if (others) {
      for (var other of others) {
        if (this.onCollision(game, other)) {
          return;
        }
      }
    }
  }

  hits(entity) {
    if (entity === this) return false;
    return this.intersects(entity);
  }

  static search(previous, current) {
    if (!previous) {
      return current;
    }
    if (Vec2.sub(current.position, this.position).length() < Vec2.sub(previous.position, this.position)) {
      return current;
    } else {
      return previous;
    }
  }

  onCollision(game, other) {
    if(this.hp <= 0) return;
    if (this.hp > 200) return;
    if (other instanceof Enemy &&
        !(other instanceof Blob) &&
        this.hp >= other.hp &&
        other.hp > 0) {
      this.hp += other.hp;
      this.speed = 16/this.hp;

      other.hp = -1;
      other.speed = -0.001;
      other.color = 'gray'
    }
  }

  draw() {
    const { width, height } = this.hp/2;
    ctx.fillStyle = String(this.color);
    ctx.fillRect(this.position.x - width/2, this.position.y - height/2, width, height);
  }

  static standard(position, speed) {
    return new Blob(position, new Size(10,10), 'green', 10, speed);
  }
}
