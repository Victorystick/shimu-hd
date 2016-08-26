export class ScoreSystem {
  public scores: Map<any, number>;
  constructor() {
    this.scores = new Map();
  }

  static standard() {
    return new ScoreSystem();
  }

  initialize(player) {
    this.setScore(player, 0)
  }

  getScore(player) {
      return this.scores.get(player);
  }

  setScore(player, score) {
    if (player) {
      this.scores.set(player, score);
    }
  }

  updateScore(player, dscore) {
    return this.setScore(player, this.getScore(player)+dscore);
  }

  onLevelChange(player, level, timeleft) {
    this.updateScore(player, (timeleft+2000) / 10);
  }

  onEnemyKilled(player, enemy) {
    this.updateScore(player, 10);
  }
}
