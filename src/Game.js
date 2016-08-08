import {Keyboard} from './controls.js';
import {Entity, Shimu} from './entities/all.js';
import {Size, Vec2} from './core.js';

export class Game {
  constructor(context, logic, controls, nextFrame) {
    this.ctx = context;
    this.logic = logic;
    this.controls = controls;
    this.nextFrame = nextFrame;

    const size = Size.from(context.canvas);
    this.board = new Entity(new Vec2(size.width / 2, size.height / 2), size);

    this.player = null;
    this.entities = [];
    this.removeSet = new Set();
  }

  getBoard() {
    return this.board;
  }

  getSize() {
    return this.board.size;
  }

  start() {
    this.initialize();
    this.nextFrame(this.tick, this);
    return this;
  }

  initialize() {
    this.player = new Shimu(new Vec2(50, 50), this.controls);
    this.entities.push(this.player);

    this.logic.initialize(this);
  }

  tick(delta) {
    this.update(delta);
    this.render();

    if (this.logic.continue()) {
      this.nextFrame(this.tick, this);
    }
  }

  update(delta) {
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].update(this, delta);
    }

    removeElementsInSet(this.entities, this.removeSet);
    this.removeSet.clear();

    this.logic.update(this, delta);
  }

  remove(entity) {
    this.removeSet.add(entity);
  }

  render() {
    this.ctx.clearRect(0, 0, this.board.size.width, this.board.size.height);

    this.entities.forEach(draw, this.ctx);
  }
}

export function removeElementsInSet(elements, set) {
  let j = 0;

  for (let i = 0; i < elements.length; i++) {
    // If we should remove this entity, ignore it for now.
    if (set.has(elements[i])) {
      continue;
    }

    // Otherwise, move the current entity to the `j`th index.
    elements[j++] = elements[i];
  }

  elements.length = j;
}

/**
 * @param {Entity} entity
 * @this {CanvasRenderingContext2D}
 */
function draw(entity) {
  entity.draw(this);
}
