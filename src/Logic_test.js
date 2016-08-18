import assert from 'assert';
import {Context, Controls} from './testing/fakes.js';
import {createArgSaver} from './testing/mocks.js';
import {Game} from './Game.js';
import {Logic} from './Logic.js';
import {Size} from './core.js';
import {Enemy} from './entities/all.js';

describe('Logic', () => {
  const context = new Context(new Size(300, 100));
  const ruleset = {
    initialize: (rules) => {}
  }

  it('initializes a Game with initial enemies', () => {
    const spawner = {
      initialize: createArgSaver()
    }
    const logic = new Logic(ruleset, spawner);
    assert.equal(logic.level, 0);

    const game = new Game(context, logic, null, null);

    game.initialize();
    assert.equal(logic.level, 1);

    assert.deepEqual(spawner.initialize.args, [game, 0],
      'game should be initialized with at least one enemy');
  });

  it('updates the Game state with more enemies if required', () => {
    const spawner = {
      initialize: () => {},
      spawn: createArgSaver()
    }
    const logic = new Logic(ruleset, spawner);
    const controls = new Controls();

    const game = new Game(context, logic, controls, null);
    game.initialize();

    for (var i = 0; i < 20; i++) {
      game.entities.push(new Enemy());
    }


    game.update(5000);
    assert.equal(spawner.spawn.times, 0);
    game.update(2000);

    game.update(8000);
    assert.equal(spawner.spawn.times, 1);
  });
});
