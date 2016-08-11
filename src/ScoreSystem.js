
export class ScoreSystem {
	constructor() {
  }

	initialize(player) {
		player.score = 0;
	}

	getScore(player) {
		return player.score;
	}

	updateScore(player, dscore) {
		if (player != null) {
			player.score += dscore;
		}
	}

	onLevelChange(player, level, timeleft) {
		this.updateScore(player, (timeleft+2000) / 10);
	}

	onEnemyKilled(player, enemy) {
		this.updateScore(player, 10);
	}
}
