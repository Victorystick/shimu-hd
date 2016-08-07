import {Entity} from './Entity.js';

export class Bullet extends Entity {
  constructor(owner, reticule) {
    super(owner.point, 2, 'gray');
    this.direction = {x: 1, y: 0};
    this.owner = owner;
  }

  tick() {
    this.point.move(this.direction.x, this.direction.y);
  }
}
