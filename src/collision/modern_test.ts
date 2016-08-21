import * as assert from 'assert';
import {createArgSaver} from '../testing/mocks';
import {Context} from '../testing/fakes';
import {Vec2, Size} from '../core';
import {Modern} from './modern';
import {Game} from '../Game';
import {PlasmaBullet, Enemy} from '../entities/all';

describe('Modern', () => {
  describe('PlasmaBullet hits Enemy', () => {
    it('loses heat on collison', () => {
      const rules = {
        add: createArgSaver()
      };
      Modern.initialize(rules);

      const game = new Game(new Context(new Size(0, 0)), null, null, null);
      const bullet = new PlasmaBullet(new Vec2(2, 2), new Vec2(0, 1), null);
      const enemy = Enemy.standard(new Vec2(2, 2), 0);
      const oldHeat = bullet.heat;
      Modern.PlasmaBulletHitsEnemy(game, bullet, enemy);
      assert.ok(bullet.heat < oldHeat, 'heat should decrease');
    });
  });
});
