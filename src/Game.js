import {Keyboard} from './controls.js';
import {Enemy, Entity, Shimu} from './entities/all.js';
import {Size, Vec2} from './core.js';

export class Game {
  constructor(context, controls, nextFrame) {
    this.ctx = context;
    const size = Size.from(context.canvas);

    this.controls = controls;

    this.nextFrame = nextFrame;

    this.board = new Entity(new Vec2(size.width / 2, size.height / 2), size);

    this.player = null;
    this.entities = [];
    this.removeSet = new Set();

    this.running = true;

    this.level = 0;
    this.timeSinceSpawn = 0;
  }

  getBoard() {
    return this.board;
  }

  getSize() {
    return this.board.size;
  }

  start() {
    this.player = new Shimu(new Vec2(50, 50), this.controls);
    this.entities.push(this.player);

    spawnEnemies(this, this.level++);

    this.running = true;
    this.nextFrame(this.tick, this);
  }

  tick(delta) {
    this.update(delta);
    this.render();

    if (this.running) {
      this.nextFrame(this.tick, this);
    }
  }

  update(delta) {
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].update(this, delta);
    }

    removeElementsInSet(this.entities, this.removeSet);
    this.removeSet.clear();

    this.timeSinceSpawn += delta;
    if (this.timeSinceSpawn > 15000 || this.entities.length < 10) {
      spawnEnemies(this, this.level++);
      //game.entities.push(new Enemy(new Vec2(20, 20), 5, 'yellow', 0.05 + 0.002*level))
      this.timeSinceSpawn -= 15000;
    }

    console.log(this.entities.length);
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

function spawnEnemies(game, level) {
  for (var i = 0; i < 30; i++) {
    game.entities.push(Enemy.standard(bogoSpawn(game.getSize(), game.player), 0.05 + 0.002*level))
  }
}

function bogoSpawn(size, player) {
  var position = new Vec2(0, 0);
  do {
    position.x = Math.random()*size.width;
    position.y = Math.random()*size.height;
  } while (Vec2.sub(position, player.position).length() < 100)
  return position;
}

/**
 * @param {Entity} entity
 * @this {CanvasRenderingContext2D}
 */
function draw(entity) {
  entity.draw(this);
}
