import {Size} from '../core.js';
import * as easydraw from './easydraw.js';

export class Gun {
  constructor(projectile) {
    this.owner = null;
    this.projectileConstructor = projectile;
    this.reticule = new Reticule(this);

    this.ammo = 0;
    this.maxAmmo = 15;
    this.cooldown = 0;
  }

  update(game, delta) {
    if (this.cooldown <= 0 && this.ammo < this.maxAmmo) {
      this.ammo++;
      this.cooldown = 0;
    } else {
      this.cooldown -= delta;
    }
  }

  draw(ctx) {
    this.reticule.draw(ctx);
  }

  fire(game) {
    if (this.owner === null) {
      return;
    }

    if (this.ammo > 0)  {
      this.ammo--;
      const bullet = new this.projectileConstructor(
        this.owner.position.clone(),
        this.owner.getFaceDirection(),
        this.owner);
      game.entities.push(bullet);
    }
    if (this.cooldown < this.maxAmmo*3) {
      this.cooldown += 50;
    }
  }
}

export class Reticule {
  constructor(gun) {
    this.size = new Size(4,4);
    this.color = 'white';
    this.gun = gun;
  }

  draw(ctx) {
    const owner = this.gun.owner;
    const pos = owner.getFaceDirection().scale(20).add(owner.position);

    easydraw.strokeRect(ctx, pos, this.size, this.color);
  }
}
