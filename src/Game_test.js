import assert from 'assert';
import {Size} from './core.js';
import {Context} from './testing/fakes.js';
import {createArgSaver} from './testing/mocks.js';
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
    const logic = {
      initialize: createArgSaver()
    };

    const game = new Game(fakeContext, logic, null, null);
    game.initialize();

    // Assume the player character is the only entity.
    assert.deepEqual(game.entities, [game.player]);

    // `logic.initialize` should be called with the game instance.
    assert.deepEqual(logic.initialize.args, [game]);
  });

  it('start', () => {
    const framer = createArgSaver();
    const game = new Game(fakeContext, { initialize() {} }, null, framer);

    assert.equal(game.start(), game);
    assert.deepEqual(framer.args, [game.tick, game]);
  });

  it('update', () => {
    const logic = {
      update: createArgSaver()
    };

    const game = new Game(fakeContext, logic, null, null);

    // Assume 13ms has passed.
    game.update(13);

    // `logic.update` should be called with the game instance.
    assert.deepEqual(logic.update.args, [game, 13]);
  });

  describe('tick', () => {
    it('calls update and render', () => {
      const logic = {
        continue: createArgSaver(false),
        update: createArgSaver()
      };

      const game = new Game(fakeContext, logic, null, null);
      game.tick(10);

      assert.deepEqual(logic.update.args, [game, 10]);
      assert.deepEqual(logic.continue.args, []);
    });

    it('it also calls nextFrame if logic.continue()', () => {
      const logic = {
        continue: createArgSaver(true),
        update: createArgSaver()
      };

      const framer = createArgSaver();

      const game = new Game(fakeContext, logic, null, framer);
      game.tick(10);

      assert.deepEqual(logic.update.args, [game, 10]);
      assert.deepEqual(logic.continue.args, []);
      assert.deepEqual(framer.args, [game.tick, game]);
    });
  });
});
