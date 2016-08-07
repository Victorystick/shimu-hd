import {Keyboard} from './controls.js';
import {Shimu} from './entities/all.js';
import {Vec2} from './core.js';

export class Game {
  constructor(canvas, controls, nextFrame) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.controls = controls;

    this.nextFrame = nextFrame;

    this.player = null;
    this.entities = [];
    this.running = true;
  }

  getSize() {
    return this.canvas;
  }

  start() {
    this.player = new Shimu(new Vec2(50, 50), this.controls);
    this.entities.push(this.player);

    this.running = true;
    this.nextFrame(this.tick, this);
  }

  tick(delta) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].update(this, delta);
    }

    this.entities.forEach(draw, this.ctx);

    if (this.running) {
      this.nextFrame(this.tick, this);
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
