import {Game} from '../game.ts';

export interface Spawner {
	initialize(game: Game, level: number);
	spawn(game: Game, level: number);
}
