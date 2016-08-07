import {Size} from '../core.js';
import {Entity} from './Entity.js';

export class Bullet extends Entity {
  constructor(owner, reticule) {
    super(owner.position.clone(), new Size(2,2), 'white');
    this.direction = owner.getFacingDirection().scale(15);
    this.owner = owner;
  }

  update() {
    this.position.add(this.direction);
  }
}
