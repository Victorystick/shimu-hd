import {Size} from '../core.js';
import {Entity} from './Entity.js';

const size = new Size(10, 10);

export class Shimu extends Entity {
  constructor(position, controls) {
    super(position, size, 'red');

    this.controls = controls;
  }

  update(game, delta) {
    
  }
}
