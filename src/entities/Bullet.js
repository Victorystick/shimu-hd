import {Size} from '../core.js';
import {Entity} from './Entity.js';

export class Bullet extends Entity {
  constructor(position, direction, owner) {
    super(position, new Size(2,2), 'white');
    this.direction = direction;
    this.speed = direction.length();
  }

  update(game, delta) {
    this.position.add(this.direction.setLength(delta * this.speed));

    if (!game.getBoard().intersects(this)) {
      game.remove(this);
    }
  }
}
