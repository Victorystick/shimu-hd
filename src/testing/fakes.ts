import {Vec2, Size} from '../core';

export class Context {
  public canvas : Size;

  constructor(size : Size) {
    this.canvas = size;
  }

  clearRect() {}
}

export class Controls {
  public move: Vec2;
  public face: Vec2;
  public primary: boolean;
  
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
