import {Vec2} from './core';
import {Spawner} from './spawning/Spawner'
import {Enemy} from './entities/all';
import {CollisionRules, RulesSet} from './collision/CollisionRules';
import {Modern} from './collision/modern';
import {Injected} from './injecter';
import {ScoreSystem} from './ScoreSystem';

export class Logic {
  private running: boolean;
  public level: number;
  private timeSinceSpawn: number;
  private collision: CollisionRules;
  private spawner: Spawner;

  constructor(ruleset: RulesSet, spawner: Spawner) {
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
      
      const timeRemaining = 15000 - this.timeSinceSpawn
      Injected(ScoreSystem).onLevelChange(game.player, this.level, timeRemaining); 

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

    const score = Math.floor(Injected(ScoreSystem).getScore(game.player));
    ctx.strokeText(`Score: ${score}`, 170, 20);
  }
}


