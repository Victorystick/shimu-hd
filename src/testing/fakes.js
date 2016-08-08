import {Vec2} from '../core.js';

export class Context {
  constructor(size) {
    this.canvas = size;
  }

  clearRect() {}
}

export class Controls {
  constructor() {
    this.move = Vec2.ZERO;
    this.face = Vec2.ZERO;
    this.primary = false;
  }

  attemptsPrimaryAction() {
    return this.primary;
  }

  getFaceDirection() {
    return this.face.clone();
  }

  getMoveDirection() {
    return this.move.clone();
  }
}
