import assert from 'assert';
import {createArgSaver} from '../testing/mocks.js';
import {CollisionRules} from './CollisionRules.js';
import {Vec2, Size} from '../core.js';
import {Enemy, Bullet, PlasmaBullet} from '../entities/all.js';

describe('CollisionRules', () => {
  describe('onCollide', () => {
    const enemy = new Enemy(new Vec2(0,0), new Size(0,0), null, 0, 0);

    it('calls when types are the same', () => {
      const col = new CollisionRules();
      const bullet = new Bullet(new Vec2(0,0), new Vec2(0,0), null);
      const call = new createArgSaver();
      col.add(Bullet, Enemy, call);

      col.onCollide(null, null, bullet, enemy);
      assert.equal(call.times, 1);
      assert.deepEqual(call.args, [null, null, bullet, enemy]);
    });

    it('calls when entity #1 is of a subclass', () => {
      const col = new CollisionRules();
      const bullet = new PlasmaBullet(new Vec2(0,0), new Vec2(0,0), null);
      const call = new createArgSaver();
      col.add(Bullet, Enemy, call);

      col.onCollide(null, null, bullet, enemy);
      assert.equal(call.times, 1);
      assert.deepEqual(call.args, [null, null, bullet, enemy]);
    });

    it('calls when entity #2 is of a subclass', () => {
      const col = new CollisionRules();
      const bullet = new PlasmaBullet(new Vec2(0,0), new Vec2(0,0), null);
      const call = new createArgSaver();
      col.add(Enemy, Bullet, call);

      col.onCollide(null, null, enemy, bullet);
      assert.equal(call.times, 1);
      assert.deepEqual(call.args, [null, null, enemy, bullet]);
    });

    it('stops calling rules when one returns false', () => {
      const col = new CollisionRules();
      const bullet = new PlasmaBullet(new Vec2(0,0), new Vec2(0,0), null);
      const call = new createArgSaver(false);
      col.add(PlasmaBullet, Enemy, call);
      col.add(Bullet, Enemy, call);

      col.onCollide(null, null, bullet, enemy);
      assert.equal(call.times, 1);
    });

    it ('does not call anything when there is no match', () => {
      const col = new CollisionRules();
      const bullet = new Bullet(new Vec2(0,0), new Vec2(0,0), null);
      const call = new createArgSaver(true);
      col.add(Bullet, Enemy, call);
      col.add(PlasmaBullet, Enemy, call);
      col.add(PlasmaBullet, Bullet, call);

      col.onCollide(null, bullet, bullet);
      assert.equal(call.times, 0);
    });
  });
});
