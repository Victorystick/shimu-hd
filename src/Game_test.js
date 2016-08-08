import assert from 'assert';
import {Size} from './core.js';
import {Context} from './testing/fakes.js';
import {Game, removeElementsInSet} from './Game.js';

describe('removeElementsInSet', () => {
  it('does nothing for the empty set', () => {
    const set = new Set();
    const array = [1, 2, 3];

    removeElementsInSet(array, set);

    assert.deepEqual(array, [1, 2, 3]);
  });

  it('removes items in set', () => {
    const set = new Set([2, 5]);
    const array = [5, 2];

    removeElementsInSet(array, set);

    assert.deepEqual(array, []);
  });

  it('shifts remaining elements towards the beginning', () => {
    const set = new Set([1, 3, 4, 6]);
    const array = [1, 2, 3, 4, 5, 6, 7];

    removeElementsInSet(array, set);

    assert.deepEqual(array, [2, 5, 7]);
  });
});

describe('Game', () => {
  const fakeContext = new Context(new Size(0, 0));

  it('initialize', () => {
    let gamePassedToLogic;

    const initLogic = {
      initialize(game) {
        gamePassedToLogic = game;
      }
    };

    const game = new Game(fakeContext, initLogic, null, null);
    game.initialize();

    // Assume the player character is the only entity.
    assert.deepEqual(game.entities, [game.player]);

    // `logic.initialize` should be called with the game instance.
    assert.equal(gamePassedToLogic, game);
  });

  it('update', () => {
    let gamePassedToLogic;

    const updateLogic = {
      initialize() {},

      update(game, delta) {
        gamePassedToLogic = game;
        assert.equal(delta, 13);
      }
    };

    const game = new Game(fakeContext, updateLogic, null, null);

    // Assume 13ms has passed.
    game.update(13);

    // `logic.update` should be called with the game instance.
    assert.equal(gamePassedToLogic, game);
  });
});
