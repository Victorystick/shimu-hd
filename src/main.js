import {Keyboard} from './controls.js';

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

class Size {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;

    this.controls = new Keyboard(canvas);

    this.ctx = canvas.getContext('2d');

    this.player = null;
    this.entities = [];
    this.running = true;

    this.boundTick = () => this.tick();
  }

  start() {
    this.player = new ArmedEntity(new Point(50, 50), new Size(10, 10), 'red',
      new Gun(this, Bullet.constructor));
    this.entities.push(this.player);

    this.running = true;
    requestAnimationFrame(this.boundTick);
  }

  tick() {
    this.entities.forEach(draw, this.ctx)

    if (this.running) {
      requestAnimationFrame(this.boundTick);
    }
  }
}

class Gun {
  constructor(game, projectile) {
    this.game = game;
    this.owner = null;
    this.projectileConstructor = projectile;
    this.reticule = new Reticule(this);

    this.ammo = 0;
    this.maxAmmo = 15;
    this.cooldown = 0;
  }

  tick() {
    if (this.cooldown === 0 && this.ammo < this.maxAmmo) {
      this.ammo++;
    } else {
      this.cooldown--;
    }
  }

  draw(ctx) {
    this.reticule.draw(ctx);
  }

  fire() {
    if (this.owner === null) {
      return;
    }

    if (this.ammo > 0)  {
      this.ammo--;
      const bullet = this.projectileConstructor(owner, reticule);
      this.game.entities.push(bullet);
    }
    if (this.cooldown < this.maxAmmo*3) {
      this.cooldown++;
    }
  }
}

class Reticule {
  constructor(gun) {
    this.size = new Size(4,4);
    this.color = 'white';
    this.gun = gun;
  }

  draw(ctx) {
    ctx.strokeStyle = String(this.color);
    ctx.lineWidth = String(3);
    ctx.rect(this.gun.owner.point.x + 7, this.gun.owner.point.y, this.size.width, this.size.height);
    ctx.stroke();
  }
}

/**
 * @param {Entity} entity
 * @this {CanvasRenderingContext2D}
 */
function draw(entity) {
  entity.draw(this);
}


class Entity {
  constructor(point, size, color) {
    this.point = point;
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = String(this.color);
    ctx.fillRect(this.point.x, this.point.y, this.size.width, this.size.height);
  }
}

class ArmedEntity extends Entity {
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
    this.gun.draw(ctx);
  }
}

class Bullet extends Entity {
  constructor(owner, reticule) {
    super(owner.point, 2, 'gray');
    this.direction = new Point(1, 0);
    this.owner = owner;
  }

  tick() {
    this.point.move(this.direction.x, this.direction.y);
  }
}


function start(canvas) {
  new Game(canvas).start();
}

export default {
  start: start,
};
