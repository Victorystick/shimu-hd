import * as assert from 'assert';
import {createArgSaver} from './mocks';

describe('createArgSaver', () => {
  it('creates a function that returns the given argument', () => {
    const object = {};
    const func = createArgSaver(object);

    assert.equal(func(), object);
  });

  it('stores the arguments into the args property', () => {
    const func = createArgSaver();

    func(1, 2, 3);
    assert.deepEqual(func.args, [1, 2, 3]);

    func([]);
    assert.deepEqual(func.args, [[]]);
  });
});
