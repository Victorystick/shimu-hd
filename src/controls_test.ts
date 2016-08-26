import * as assert from 'assert';
import {Keyboard} from './controls';

describe('Keyboard', () => {
  it('listens for events', () => {
    const types = [];

    const element = {
      addEventListener(type, eventHandler) {
        types.push(type);
        assert.ok(eventHandler instanceof Keyboard, 'should call with instance');
      }
    };

    new Keyboard(element);

    assert.deepEqual(types, [
      'keydown', 'keyup', 'mousedown', 'mousemove', 'mouseup'
    ]);
  });
});
