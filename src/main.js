import {Keyboard} from './controls.js';
import {Shimu} from './entities/all.js';
import {Vec2} from './core.js';

class Game {
  constructor(canvas) {
    this.canvas = canvas;

    this.controls = new Keyboard(canvas);

    this.ctx = canvas.getContext('2d');

    this.player = null;
    this.entities = [];
    this.running = true;

    this.boundTick = () => this.tick();
  }

  start() {
    this.player = new Shimu(new Vec2(50, 50), null);
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



export default {
  start(canvas) {
    new Game(canvas).start();
  },
};
