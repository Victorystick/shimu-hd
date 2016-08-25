import {Size} from '../core.js';
import {ArmedEntity} from './ArmedEntity.js';
import {Gun} from '../drawable/Gun.js';
import {Bullet, PlasmaBullet} from './Bullet.js';

const size = new Size(10, 10);

export class Shimu extends ArmedEntity {
  constructor(position, controls) {
    super(position, size, 'red', new Gun(PlasmaBullet));
    this.controls = controls;
    this.speed = 0.1;
    this.alive = true;
  }

  update(game, delta) {
    if (!this.alive) {
      return;
    }

    this.position.add(this.controls.getMoveDirection(this).scale(this.speed * delta));

    this.gun.update(game, delta);

    if (this.controls.attemptsPrimaryAction()) {
    	this.gun.fire(game);
    }
  }

  kill() {
    this.alive = false;
  }

  getFaceDirection() {
    return this.controls.getFaceDirection(this);
  }
}
