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

  getSize() {
    return this.canvas;
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

function spawnEnemies(game, level) {
  for (var i = 0; i < 30; i++) {
    game.entities.push(new Enemy(bogoSpawn(game.getSize(), game.player), 5, 'yellow', 0.05 + 0.002*level))
  }
}

function bogoSpawn(size, player) {
  var position = new Vec2(0, 0);
  do {
    position.x = Math.random()*size.width;
    position.y = Math.random()*size.height;
  } while (Vec2.sub(position, player.position).length() < 100)
}

/**
 * @param {Entity} entity
 * @this {CanvasRenderingContext2D}
 */
function draw(entity) {
  entity.draw(this);
}
