export {Touch} from './controls/Touch';
import {Vec2} from './core';
import {Entity} from './entities/all'

export interface EntityControls {
  getFaceDirection(entity: Entity): Vec2;
  getMoveDirection(): Vec2;
  attemptsPrimaryAction(): boolean;
}


export class Keyboard {
  private element;
  private mousePosition: Vec2;
  private buttons: number;
  private keyMap;

  constructor(element) {
    this.element = element;

    this.mousePosition = Vec2.ZERO;
    this.buttons = 0;

    this.keyMap = {};

    this.element.addEventListener('keydown', this);
    this.element.addEventListener('keyup', this);
    this.element.addEventListener('mousedown', this);
    this.element.addEventListener('mousemove', this);
    this.element.addEventListener('mouseup', this);
  }

  handleEvent(event) {
    if (event.type === 'mousemove') {
      const rect = this.element.getBoundingClientRect();
      this.mousePosition = new Vec2(event.clientX - rect.left, event.clientY - rect.top);
      return;
    }

    if (event.type === 'mousedown' || event.type === 'mouseup') {
      this.buttons = event.buttons;
    }

    this.keyMap[ event.key ] = event.type === 'keydown';
  }

  attemptsPrimaryAction() {
    return (this.buttons & 1) > 0;
  }

  getFaceDirection(entity) {
    return Vec2.sub(this.mousePosition, entity.position).normalize();
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
