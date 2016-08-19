import assert from 'assert';
import {createArgSaver} from '../testing/mocks.js';
import {Context} from '../testing/fakes.js';
import {Vec2, Size} from '../core.js';
import {Game} from '../Game.js';
import {Enemy} from '../entities/all.js';
import {LegacySpawner} from './LegacySpawner.js';

describe('LegacySpawner', () => {
	const context = new Context(new Size(300, 100));
	it('spawns a player and a set of enemies during initialization', () => {
		const spawner = new LegacySpawner();
		const game = new Game(context, null, null, null);

		spawner.initialize(game, 0);

		assert.notStrictEqual(game.player, null, 'Player has been spawned');
		assert.equal(game.entities.filter(e => e instanceof Enemy).length, 30);
	});

	it('spawns more enemies', () => {
		const spawner = new LegacySpawner();
		const game = new Game(context, null, null, null);
		game.player = {
			position: new Vec2(4, 10)
		}
		spawner.spawn(game, 3);

		assert.equal(game.entities.filter(e => e instanceof Enemy).length, 30);
	});
});
