import assert from 'assert';
import {Bullet} from './Bullet.js';
import {Vec2, Size} from '../core.js';
import {Context} from '../testing/fakes.js';
import {Game} from '../Game.js';

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
    assert.equal(game.entityToRemove, null);
  });

  it('is removed when moving outside the board', () => {
    const bullet = new Bullet(new Vec2(0, 0), direction, null);

    const game = new Game(new Context(new Size(0, 0)), null, null, null);

    bullet.update(game, 10);
    assert(game.removeSet.has(bullet), 'bullet should be in removeSet');
  });
});
