import {Size} from '../core.js';

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
    //this.reticule.draw(ctx);
  }

  fire(game) {
    if (this.owner === null) {
      return;
    }

    if (this.ammo > 0)  {
      this.ammo--;
      const bullet = new this.projectileConstructor(this.owner, this.reticule);
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
    ctx.strokeStyle = String(this.color);
    ctx.lineWidth = String(3);
    ctx.rect(this.gun.owner.position.x + 7, this.gun.owner.position.y, this.size.width, this.size.height);
    ctx.stroke();
  }
}
