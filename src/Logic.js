import {Vec2} from './core.js';
import {Enemy} from './entities/all.js';
import {CollisionRules} from './collision/CollisionRules.js';

export class Logic {
  constructor() {
    this.running = true;
    this.level = 0;
    this.timeSinceSpawn = 0;
    this.collision = new CollisionRules()
  }

  initialize(game) {
    spawnEnemies(game, this.level++);
  }

  continue() {
    return this.running;
  }

  update(game, delta) {
    this.timeSinceSpawn += delta;

    if (this.timeSinceSpawn >= 15000 || game.entities.length < 10) {
      spawnEnemies(game, this.level++);
      this.timeSinceSpawn -= 15000;
    }
  }

  draw(game, ctx) {
    // TODO(victorystick): should clean this up
    ctx.font = '14px';
    ctx.strokeStyle = 'white';
    ctx.strokeText(`Level: ${this.level}`, 10, 20);

    const gun = game.player.gun;
    ctx.strokeText(`Ammo:`, 10, 40);
    ctx.fillStyle = 'white';
    ctx.fillRect(50, 32, 100 / gun.maxAmmo * gun.ammo, 10);
  }
}

function spawnEnemies(game, level) {
  for (let i = 0; i < 30; i++) {
    game.entities.push(Enemy.standard(bogoSpawn(game.getSize(), game.player), 0.05 + 0.002*level))
  }
}

function bogoSpawn(size, player) {
  let position = new Vec2(0, 0);
  do {
    position.x = Math.random()*size.width;
    position.y = Math.random()*size.height;
  } while (Vec2.sub(position, player.position).length() < 100)
  return position;
}
