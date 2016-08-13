import {CollisionRules} from './CollisionRules.js';
import {Shimu, Bullet, PlasmaBullet, Enemy} from '../entities/all.js';

export class Modern {
  static initialize(rules) {
    rules.add(Bullet, Enemy, (game, bullet, enemy) => {
      game.remove(enemy);
      game.remove(bullet);
      return false;
    });

    rules.add(PlasmaBullet, Enemy, (game, bullet, enemy) => {
      if (other.hp) {
          bullet.heat -= enemy.hp*9;
        } else {
          bullet.heat -= 10;
        }
        game.remove(enemy);
        return bullet.checkHeat(game);
    });
  }
}
