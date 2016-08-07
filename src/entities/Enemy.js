import {Vec2, Size} from '../core.js';
import {Entity} from './Entity.js';

export class Enemy extends Entity {
	constructor(point, size, color, hp, speed) {
		super(point, size, color);
		this.hp = hp;
		this.speed = speed;
	}

	update(game, delta) {
		var diff = Vec2.sub(game.player.position, this.position)
		diff.normalize();

		//Account for speed and delta.
		diff.x *= this.speed * delta;
		diff.y *= this.speed * delta;

		this.position.add(diff);

		
	}

	static standard(position, speed) {
		return new Enemy(position, new Size(5,5), 'yellow', 10, speed);
	}
}
