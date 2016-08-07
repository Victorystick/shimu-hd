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
		diff.x *= speed * delta;
		diff.y *= speed * delta;

		this.position.move(diff);
	}
}
