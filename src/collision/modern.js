import {CollisionRules} from './CollisionRules.js';
import {Shimu, Bullet, PlasmaBullet, Enemy} from '../entities/all.js';

export class Modern {
  static initialize() {
    const rules = new CollisionRules();
    rules.add(PlasmaBullet, Enemy, Modern.PlasmaBulletHitsEnemy);
    rules.add(Bullet, Enemy, Modern.BulletHitsEnemy);
    return rules;
  }

  static PlasmaBulletHitsEnemy(game, scoreSystem, bullet, enemy) {
    if (enemy.hp) {
      bullet.heat -= enemy.hp*9;
    } else {
      bullet.heat -= 10;
    }
    scoreSystem.onEnemyKilled(bullet.owner, enemy);
    game.remove(enemy);
    bullet.checkHeat(game);
    return false;
  }

  static BulletHitsEnemy(game, scoreSystem, bullet, enemy) {
    scoreSystem.onEnemyKilled(bullet.owner, enemy);
    game.remove(enemy);
    game.remove(bullet);
    return false;
  }
}
