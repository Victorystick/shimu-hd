import {CollisionRules} from './CollisionRules';
import {Shimu, Bullet, PlasmaBullet, Enemy} from '../entities/all';
import {Injected} from '../injecter';
import {ScoreSystem} from '../ScoreSystem';
import * as kill from './kill';

export class Modern {
  static initialize(rules) {
    rules.add(PlasmaBullet, Enemy, Modern.PlasmaBulletHitsEnemy);
    rules.add(Bullet, Enemy, Modern.BulletHitsEnemy);
    rules.add(Enemy, Shimu, kill.theLatter);
  }

  static PlasmaBulletHitsEnemy(game, bullet, enemy) {
    if (enemy.hp) {
      bullet.heat -= enemy.hp*9;
    } else {
      bullet.heat -= 10;
    }
    Injected(ScoreSystem).onEnemyKilled(bullet.owner, enemy);
    game.remove(enemy);
    bullet.checkHeat(game);
    return false;
  }

  static BulletHitsEnemy(game, bullet, enemy) {
    Injected(ScoreSystem).onEnemyKilled(bullet.owner, enemy);
    game.remove(enemy);
    game.remove(bullet);
    return false;
  }
}
