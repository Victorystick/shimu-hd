import {Size} from '../core.js';
import {ArmedEntity} from './ArmedEntity.js';
import {Gun} from '../drawable/Gun.js';
import {Bullet} from './Bullet.js';

const size = new Size(10, 10);

export class Shimu extends ArmedEntity {
  constructor(position, controls) {
    super(position, size, 'red', new Gun(Bullet));
    this.controls = controls;
    this.speed = 0.1;
  }

  update(game, delta) {
    this.position.add(this.controls.getMoveDirection(this).scale(this.speed * delta));
    this.gun.tick();
    if (this.controls.attemptsPrimaryAction()) {
    	this.gun.fire(game);
    }
  }

  getFacingDirection() {
    return this.controls.getFaceDirection(this);
  }
}
