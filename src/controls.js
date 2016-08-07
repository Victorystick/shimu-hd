import {Vec2} from './core.js';

/*
interface EntityControls {
  getFace(entity: Entity): Vec2;
  getMovement(): Vec2;
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

  getFace(entity) {
    return this.mouse.sub(entity.position);
  }

  getMovement() {
    const vec = new Vec2();

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

    vec.normalize();
    return vec;
  }
}
