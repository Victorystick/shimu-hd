import * as assert from 'assert';
import {Bullet, PlasmaBullet} from './Bullet';
import {Enemy} from './Enemy';
import {Vec2, Size} from '../core';
import {Context} from '../testing/fakes';
import {Game} from '../Game';

describe('Bullet', () => {
  const direction = new Vec2(0, 1);

  it('is created with a position and a direction', () => {
    const position = new Vec2(2, 0);
    const bullet = new Bullet(position, direction, null);

    assert.equal(bullet.position, position);
    assert.equal(bullet.direction, direction);
    assert.equal(bullet.owner, null);
  });

  it('moves along its direction', () => {
    const bullet = new Bullet(new Vec2(10, 2), direction, null);

    const game = new Game(new Context(new Size(100, 100)), null, null, null);
    bullet.update(game, 10);

    assert.deepEqual(bullet.position, new Vec2(10, 12));
    assert.equal(game.removeSet.size, 0);
  });

  it('is removed when moving outside the board', () => {
    const bullet = new Bullet(new Vec2(0, 0), direction, null);

    const game = new Game(new Context(new Size(0, 0)), null, null, null);

    bullet.update(game, 10);
    assert.ok(game.removeSet.has(bullet), 'bullet should be in removeSet');
  });

  describe('hit', () => {
    const ownerBullet = new Bullet(Vec2.ZERO, Vec2.ZERO, null);
    const bullet = new Bullet(Vec2.ZERO, Vec2.ZERO, ownerBullet);

    it('cannot hit itself', () => {
      assert.ok(!bullet.hits(bullet));
    });

    it('cannot hit its owner', () => {
      assert.ok(!bullet.hits(ownerBullet));
    });

    it('can hit anything else', () => {
      assert.ok(ownerBullet.hits(bullet));
    });
  });
});

describe('PlasmaBullet', () => {
  const position = new Vec2(2, 2);
  const direction = new Vec2(0, 1);

  it('is orange', () => {
    const bullet = new PlasmaBullet(position, direction, null);
    assert.equal(bullet.color, 'orange');
  });

  it('has heat', () => {
    const bullet = new PlasmaBullet(position, direction, null);
    assert.ok(bullet.heat > 0, 'initial heat should be positive');
  });

  it('loses heat over time', () => {
    const game = new Game(new Context(new Size(0, 0)), null, null, null);
    const bullet = new PlasmaBullet(position, direction, null);
    const oldHeat = bullet.heat;

    bullet.update(game, 3);
    assert.ok(bullet.heat < oldHeat, 'heat should decrease');
  });

  it('is removed when out of heat', () => {
    const bullet = new PlasmaBullet(position, direction, null);
    const game = new Game(new Context(new Size(0, 0)), null, null, null);

    bullet.heat = 0;
    bullet.update(game, 0);
    assert.ok(game.removeSet.has(bullet), 'bullet should be in removeSet');
  });
});
