import {Game} from './Game.js';
import * as controls from './controls.js';



export default {
  start(canvas) {
    const ctrl = new controls.Keyboard(canvas);
    new Game(canvas, ctrl).start();
  },
};
