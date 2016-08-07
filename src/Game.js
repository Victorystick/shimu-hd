import {Keyboard} from './controls.js';
import {Shimu} from './entities/all.js';
import {Vec2} from './core.js';

export class Game {
  constructor(canvas, controls) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.controls = controls;

    this.player = null;
    this.entities = [];
    this.running = true;

    this.boundTick = () => this.tick();
  }

  start() {
    this.player = new Shimu(new Vec2(50, 50), this.controls);
    this.entities.push(this.player);

    this.running = true;
    requestAnimationFrame(this.boundTick);
  }

  tick() {
    this.entities.forEach(draw, this.ctx)

    if (this.running) {
      requestAnimationFrame(this.boundTick);
    }
  }
}

/**
 * @param {Entity} entity
 * @this {CanvasRenderingContext2D}
 */
function draw(entity) {
  entity.draw(this);
}
