import {Game} from './Game.js';
import * as controls from './controls.js';
import {createAnimationTicker} from './tickers.js';

export default {
  start(canvas) {
    const ctrl = new controls.Keyboard(canvas);
    const ticker = createAnimationTicker();
    new Game(canvas, ctrl, ticker).start();
  },
};
