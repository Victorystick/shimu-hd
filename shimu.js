
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

class Size {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}


class Keyboard {
  constructor(element) {
    this.element = element;

    this.keyMap = {};

    this.element.addEventListener('keydown', this);
    this.element.addEventListener('keyup', this);
  }

  handleEvent(event) {
    this.keyMap[ event.key ] = event.type === 'keydown';
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;

    this.controls = new Keyboard(canvas);

    this.ctx = canvas.getContext('2d');

    this.running = true;
    this.shimu = new Entity(new Point(50, 50), new Size(10, 10), 'red');

    this.boundTick = () => this.tick();
  }

  start() {
    this.running = true;
    requestAnimationFrame(this.boundTick);
  }

  tick() {
    this.shimu.draw(this.ctx);

    if (this.running) {
      requestAnimationFrame(this.boundTick);
    }
  }
}

class Gun {
  constructor(game, owner, projectile, reticule) {
    this.game = game;
    this.owner = owner;
    this.projectileConstructor = projectile;
    this.reticule = reticule;
  }

  fire() {
    const bullet = new this.projectileConstructor(owner, reticule);
  }
}

class Bullet extends Entity {
  constructor(owner, reticule) {
    super(owner.point, 2, 'gray');
    this.direction = {x: 1, y = 0};
    this.owner = owner;
  }

  tick() {
    this.point.move(this.direction);
  }
}


class Entity {
  constructor(point, size, color) {
    this.point = point;
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = String(this.color);
    ctx.fillRect(this.point.x, this.point.y, this.size.width, this.size.height);
  }
}


function start(canvas) {
  game = new Game(canvas);

  game.start();
}

var Shimu = {
  start: start,
};
