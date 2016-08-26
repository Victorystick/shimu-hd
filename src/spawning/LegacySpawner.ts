import {Vec2} from '../core';
import {Shimu, Enemy} from '../entities/all';

export class LegacySpawner {
  initialize(game, level) {
    game.player = new Shimu(new Vec2(50, 50), game.controls);
    game.entities.push(game.player);

    this.spawn(game, level);
  };

  spawn(game, level) {
    for (let i = 0; i < 30; i++) {
      game.entities.push(
        Enemy.standard(
          bogoSpawn(game.getSize(), game.player), 
          0.05 + 0.002*level))
    }
  };
}

function bogoSpawn(size, player) {
  let position = new Vec2(0, 0);
  do {
    position.x = Math.random()*size.width;
    position.y = Math.random()*size.height;
  } while (Vec2.sub(position, player.position).length() < 100)
  return position;
}
