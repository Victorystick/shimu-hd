import assert from 'assert';
import {Vec2} from './core.js';
import {ScoreSystem} from './ScoreSystem.js';
import {Shimu} from './entities/all.js'

describe('ScoreSystem', () => {
	const scoreSystem = new ScoreSystem();
	describe('initialize', () => {
		it('Sets a players score to 0.', () => {
			const player = new Shimu(new Vec2(0,0), null);
			scoreSystem.initialize(player);
			assert.equal(0, player.score);
		});
	});

	describe('getScore', () => {
		it('returns the current score of the player', () => {
			const player = new Shimu(new Vec2(0,0), null);
			player.score = 1337;
			assert.equal(scoreSystem.getScore(player), 1337);

			player.score = 800;
			assert.equal(scoreSystem.getScore(player), 800);

			player.score = 8001;
			assert.equal(scoreSystem.getScore(player), 8001);
		});
	});

	describe('updateScore', () => {
		it('increases score with positive argument', () => {
			const player = new Shimu(new Vec2(0,0), null);
			scoreSystem.initialize(player);
			scoreSystem.updateScore(player, 500);
			assert.equal(player.score, 500);
			scoreSystem.updateScore(player, 10);
			assert.equal(player.score, 510);
		});

		it('decrease score with negative argument', () => {
			const player = new Shimu(new Vec2(0,0), null);
			scoreSystem.initialize(player);
			scoreSystem.updateScore(player, -500);
			assert.equal(player.score, -500);
			scoreSystem.updateScore(player, -10);
			assert.equal(player.score, -510);
		});
	});
});