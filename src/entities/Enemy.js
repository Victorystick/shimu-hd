import {Vec2, Size} from '../core.js';
import {Entity} from './Entity.js';

export class Enemy extends Entity {
	constructor(point, size, color, hp, speed) {
		super(point, size, color);
		this.hp = hp;
		this.speed = speed;
	}

	update(game, delta) {
		if (!game.player) return;

		const movement = Vec2.sub(game.player.position, this.position)
			.setLength(this.speed * delta);

		this.position.add(movement);
	}

	static standard(position, speed) {
		return new Enemy(position, new Size(5,5), 'yellow', 10, speed);
	}
}
