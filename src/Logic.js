import {Vec2} from './core.js';
import {Enemy} from './entities/all.js';

export class Logic {
  constructor() {
    this.running = true;
    this.level = 0;
    this.timeSinceSpawn = 0;
  }

  initialize(game) {
    spawnEnemies(game, this.level++);
  }

  continue() {
    return this.running;
  }

  update(game, delta) {
    this.timeSinceSpawn += delta;

    if (this.timeSinceSpawn >= 15000 || game.entities.filter(e => e instanceof Enemy).length < 10) {
      spawnEnemies(game, this.level++);
      this.timeSinceSpawn -= 15000;
      if (this.timeSinceSpawn < 0) {
        this.timeSinceSpawn = 0;
      }
    }
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
