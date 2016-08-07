import {Entity} from './Entity.js';

export class ArmedEntity extends Entity {
  constructor(point, size, color, gun) {
    super(point, size, color);
    this.equip(gun);
  }

  equip(gun) {
    this.gun = gun;
    gun.owner = this;
  }

  draw(ctx) {
    super.draw(ctx);
    // this.gun.draw(ctx);
  }
}
