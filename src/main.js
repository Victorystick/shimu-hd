import {Game} from './Game.js';
import {Modern} from './collision/modern.js';
import {LegacySpawner} from './spawning/LegacySpawner.js';
import {Logic} from './Logic.js';
import * as controls from './controls.js';
import {createAnimationTicker} from './tickers.js';

function getControls() {
  return 'ontouchend' in window && confirm('Do you want touch controls?') ?
    controls.Touch : controls.Keyboard;
}

export default {
  start(canvas) {
    const Controls = getControls();

    const logic = new Logic(Modern, new LegacySpawner());
    const ctrl = new Controls(canvas);
    const ticker = createAnimationTicker();
    new Game(canvas.getContext('2d'), logic, ctrl, ticker).start();
  },
};
