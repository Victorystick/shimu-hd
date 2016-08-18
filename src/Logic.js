import {Vec2} from './core.js';
import {Enemy} from './entities/all.js';
import {CollisionRules} from './collision/CollisionRules.js';
import {Modern} from './collision/modern.js';

export class Logic {
  constructor(ruleset, spawner) {
    this.running = true;
    this.level = 0;
    this.timeSinceSpawn = 0;
    this.collision = new CollisionRules();
    ruleset.initialize(this.collision);
    this.spawner = spawner;
  }

  initialize(game) {
    this.spawner.initialize(game, this.level++);
  }

  continue() {
    return this.running;
  }

  update(game, delta) {
    this.timeSinceSpawn += delta;

    if (this.timeSinceSpawn >= 15000 || game.entities.filter(e => e instanceof Enemy).length < 10) {
      this.spawner.spawn(game, this.level++);
      this.timeSinceSpawn -= 15000;
      if (this.timeSinceSpawn < 0) {
        this.timeSinceSpawn = 0;
      }
    }
  }

  checkCollisions(game, entities) {
    for (const entity of entities) {
      if (!entity.hits) {
        continue;
      }
      const other = entities.find(entity.hits, entity);

      if (other) {
        this.collision.onCollide(game, entity, other);
      }
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


