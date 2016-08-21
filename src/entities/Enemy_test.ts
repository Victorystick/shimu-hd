import * as assert from 'assert';
import {Context} from '../testing/fakes';
import {Game} from '../Game';
import {Size, Vec2} from '../core';
import {Enemy} from './Enemy';

describe('Enemy', () => {
  it('update moves toward the player', () => {
    const enemy = Enemy.standard(new Vec2(0, 0), 1);
    const game = new Game(new Context(new Size(100, 100)), null, null, null);

    // Mock the player character.
    game.player = Enemy.standard(new Vec2(60, 0), 0);

    enemy.update(game, 1);
    assert.deepEqual(enemy.position, new Vec2(1, 0));

    enemy.update(game, 14);
    assert.deepEqual(enemy.position, new Vec2(15, 0));

    enemy.update(game, 45);
    assert.deepEqual(enemy.position, new Vec2(60, 0));
    assert.deepEqual(enemy.position, game.player.position);

    enemy.update(game, 1);
    assert.deepEqual(enemy.position, new Vec2(60, 0));
  });

  it('if no player exists, does nothing', () => {
    const enemy = Enemy.standard(new Vec2(0, 0), 1);
    const game = new Game(new Context(new Size(100, 100)), null, null, null);

    // No player.
    enemy.update(game, 10);
    assert.deepEqual(enemy.position, new Vec2(0, 0));
  });
});
