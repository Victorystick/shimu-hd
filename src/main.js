import {Game} from './Game.js';
import {Logic} from './Logic.js';
import {ScoreSystem} from './ScoreSystem.js';
import * as controls from './controls.js';
import {createAnimationTicker} from './tickers.js';

export default {
  start(canvas) {
    const logic = new Logic();
    const ctrl = new controls.Keyboard(canvas);
    const scoring = new ScoreSystem();
    const ticker = createAnimationTicker();
    new Game(canvas.getContext('2d'), logic, ctrl, ticker, scoring).start();
  },
};
