import assert from 'assert';
import {createArgSaver} from '../testing/mocks.js';
import {Context} from '../testing/fakes.js';
import {Vec2, Size} from '../core.js';
import {Modern} from './modern.js';
import {Game} from '../Game.js';
import {ScoreSystem} from '../ScoreSystem.js';
import {PlasmaBullet, Enemy} from '../entities/all.js';

describe('Modern', () => {
  describe('PlasmaBullet hits Enemy', () => {
    it('loses heat on collison', () => {
      const scoreSystem = {
        onEnemyKilled: createArgSaver()
      };

      const game = new Game(new Context(new Size(0, 0)), null, null, null);
      const bullet = new PlasmaBullet(new Vec2(2, 2), new Vec2(0, 1), null);
      const enemy = Enemy.standard(new Vec2(2, 2), 0);
      const oldHeat = bullet.heat;

      Modern.PlasmaBulletHitsEnemy(game, scoreSystem, bullet, enemy);
      assert(bullet.heat < oldHeat, 'heat should decrease');
    });
  });
});
