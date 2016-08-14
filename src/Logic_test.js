import assert from 'assert';
import {Context, Controls} from './testing/fakes.js';
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
    const logic = new Logic(ruleset);
    assert.equal(logic.level, 0);

    const game = new Game(context, logic, null, null);

    game.initialize();
    assert.equal(logic.level, 1);

    assert(game.entities.filter(e => e instanceof Enemy).length > 0,
      'game should be initialized with at least one enemy');
  });

  it('updates the Game state with more enemies if required', () => {
    const logic = new Logic(ruleset);
    const controls = new Controls();

    const game = new Game(context, logic, controls, null);
    game.initialize();

    const entities = game.entities.length;

    game.update(5000);
    assert.equal(game.entities.length, entities);

    game.update(10000);
    assert.equal(game.entities.length, entities + 30);
  });
});
