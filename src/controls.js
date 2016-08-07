import {Vec2} from './core.js';

/*
interface EntityControls {
  getFaceDirection(entity: Entity): Vec2;
  getMoveDirection(): Vec2;
}
*/

export class Keyboard {
  constructor(element) {
    this.element = element;

    this.mouse = Vec2.ZERO;
    this.keyMap = {};

    this.element.addEventListener('keydown', this);
    this.element.addEventListener('keyup', this);
    this.element.addEventListener('mousemove', this);
  }

  handleEvent(event) {
    if (event.type === 'mousemove') {
      const rect = this.element.getBoundingClientRect();
      this.mouse = new Vec2(event.clientX - rect.left, event.clientY - rect.top);
      return;
    }

    this.keyMap[ event.key ] = event.type === 'keydown';
  }

  getFaceDirection(entity) {
    return this.mouse.sub(entity.position);
  }

  getMoveDirection() {
    const vec = new Vec2(0, 0);

    if (this.keyMap['d']) {
      vec.x += 1;
    }
    if (this.keyMap['a']) {
      vec.x -= 1;
    }

    if (this.keyMap['s']) {
      vec.y += 1;
    }
    if (this.keyMap['w']) {
      vec.y -= 1;
    }

    if (vec.length() === 0) {
      return vec;
    }

    return vec.normalize();
  }
}
