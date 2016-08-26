import {Size} from '../core';
import {EntityControls} from '../controls';
import {Entity} from './Entity'
import {ArmedEntity} from './ArmedEntity';
import {Gun} from '../drawable/Gun';
import {Bullet, PlasmaBullet} from './Bullet';

const size = new Size(10, 10);

export class Shimu extends Entity implements ArmedEntity {
  controls : EntityControls;
  speed : number;
  public gun: Gun;
  private alive: boolean;

  constructor(position, controls) {
    super(position, size, 'red');
    this.controls = controls;
    this.speed = 0.1;
    this.equip(new Gun(PlasmaBullet));
    this.alive = true;
  }

  update(game, delta) {
    if (!this.alive) {
      return;
    }

    this.position.add(this.controls.getMoveDirection().scale(this.speed * delta));

    this.gun.update(game, delta);

    if (this.controls.attemptsPrimaryAction()) {
    	this.gun.fire(game);
    }
  }

  draw(ctx) {
    super.draw(ctx);
    this.gun.draw(ctx);
  }

  kill() {
    this.alive = false;
  }

  getFaceDirection() {
    return this.controls.getFaceDirection(this);
  }

  equip(gun) {
    this.gun = gun;
    gun.owner = this;
  }


}
