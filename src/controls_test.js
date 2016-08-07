import assert from 'assert';
import {Keyboard} from './controls.js';

describe('Keyboard', () => {
  it('listens for "keydown", "keyup" and "mousemove" events', () => {
    const types = [];

    const element = {
      addEventListener(type, eventHandler) {
        types.push(type);
        assert(eventHandler instanceof Keyboard, 'should call with instance');
      }
    };

    new Keyboard(element);

    assert.deepEqual(types, ['keydown', 'keyup', 'mousemove']);
  });
});
