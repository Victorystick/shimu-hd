class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
