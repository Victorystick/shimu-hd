import {Vec2} from '../core';

class TouchStick {
  private vec: Vec2;
  private origo: Vec2;
  private id: number;
  constructor() {
    this.vec = new Vec2(0, 0);
    this.origo = new Vec2(0, 0);
    this.id = -1;
  }

  get() {
    const vec = Vec2.sub(this.vec, this.origo).scale(1/50);
    return vec.length() > 1 ? vec.setLength(1) : vec;
  }

  start(id, vec) {
    if (this.id !== -1) return;

    this.id = id;
    this.origo = vec;
    this.vec.copy(this.origo);
  }

  move(id, vec) {
    if (this.id !== id) return;

    this.vec.copy(vec);
  }

  end(id, vec) {
    if (this.id !== id) return;

    this.origo.copy(this.vec.copy(Vec2.ZERO));
    this.id = -1;
  }
}

// A set of touch controls that listens to touch events.
export class Touch {
  private element;
  private left: TouchStick;
  private right: TouchStick;
  constructor(element) {
    this.element = element;

    this.left = new TouchStick();
    this.right = new TouchStick();

    element.addEventListener('touchstart', this);
    element.addEventListener('touchmove', this);
    element.addEventListener('touchend', this);
    element.addEventListener('touchcancel', this);
  }

  attemptsPrimaryAction() {
    return this.right.get().length() > 0.2;
  }

  getFaceDirection() {
    return this.right.get();
  }

  getMoveDirection() {
    return this.left.get();
  }

  handleEvent(e) {
    e.preventDefault();

    const {left, top, width} = this.element.getBoundingClientRect();

    for (const {clientX, clientY, identifier} of e.changedTouches) {
      const vec = new Vec2(clientX - left, clientY - top);

      // Handle the
      if (e.type === 'touchstart') {
        const stick = (vec.x < width/2 ? this.left : this.right);
        stick.start(identifier, vec);
      } else if (e.type === 'touchmove') {
        this.left.move(identifier, vec);
        this.right.move(identifier, vec);
      } else {
        this.left.end(identifier, vec);
        this.right.end(identifier, vec);
      }
    }
  }
}
