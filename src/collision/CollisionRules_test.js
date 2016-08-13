import assert from 'assert';
import {AsyncCall} from '../testing/asynccalls.js';
import {CollisionRules} from './CollisionRules.js';
import {Vec2, Size} from '../core.js';
import {Enemy, Bullet, PlasmaBullet} from '../entities/all.js';

describe('CollisionRules', () => {
  describe('onCollide', () => {
    const enemy = new Enemy(new Vec2(0,0), new Size(0,0), null, 0, 0);
    
    it('calls when types are the same', () => {
      const col = new CollisionRules();
      const bullet = new Bullet(new Vec2(0,0), new Vec2(0,0), null);
      const call = new AsyncCall().withArgs(bullet, enemy);
      col.add(Bullet, Enemy, call.callback());
      
      col.onCollide(bullet, enemy);
      assert(call.triggered);
      assert.equal(call.times, 1);
    });

    it('calls when entity #1 is of a subclass', () => {
      const col = new CollisionRules();
      const bullet = new PlasmaBullet(new Vec2(0,0), new Vec2(0,0), null);
      const call = new AsyncCall().withArgs(bullet, enemy);
      col.add(Bullet, Enemy, call.callback());
      
      col.onCollide(bullet, enemy);
      assert(call.triggered);
      assert.equal(call.times, 1);
    });

    it('calls when entity #2 is of a subclass', () => {
      const col = new CollisionRules();
      const bullet = new PlasmaBullet(new Vec2(0,0), new Vec2(0,0), null);
      const call = new AsyncCall().withArgs(enemy, bullet);
      col.add(Enemy, Bullet, call.callback());
      
      col.onCollide(enemy, bullet);
      assert(call.triggered);
      assert.equal(call.times, 1);
    });

    it('stops calling rules when one returns false', () => {
      const col = new CollisionRules();
      const bullet = new PlasmaBullet(new Vec2(0,0), new Vec2(0,0), null);
      const call = new AsyncCall().returns(false);
      col.add(PlasmaBullet, Enemy, call.callback());
      col.add(Bullet, Enemy, call.callback());
      
      col.onCollide(bullet, enemy);
      assert(call.triggered);
      assert.equal(call.times, 1);
    })
  });
});
