import {Game} from './Game.ts';
import {Modern} from './collision/modern.ts';
import {LegacySpawner} from './spawning/LegacySpawner.ts';
import {Logic} from './Logic.ts';
import * as controls from './controls.ts';
import {createAnimationTicker} from './tickers.ts';

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
