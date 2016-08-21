import {CollisionRules} from './CollisionRules';
import {Shimu, Bullet, PlasmaBullet, Enemy} from '../entities/all';

export class Modern {
  static initialize(rules) {
    rules.add(PlasmaBullet, Enemy, Modern.PlasmaBulletHitsEnemy);
    rules.add(Bullet, Enemy, Modern.BulletHitsEnemy);
  }

  static PlasmaBulletHitsEnemy(game, bullet, enemy) {
    if (enemy.hp) {
      bullet.heat -= enemy.hp*9;
    } else {
      bullet.heat -= 10;
    }
    game.remove(enemy);
    bullet.checkHeat(game);
    return false;
  }

  static BulletHitsEnemy(game, bullet, enemy) {
    game.remove(enemy);
    game.remove(bullet);
    return false;
  }
}
