import assert from 'assert';
import {Game, removeElementsInSet} from './Game.js';

describe('removeElementsInSet', () => {
  it('does nothing for the empty set', () => {
    const set = new Set();
    const array = [1, 2, 3];

    removeElementsInSet(array, set);

    assert.deepEqual(array, [1, 2, 3]);
  });

  it('removes items in set', () => {
    const set = new Set([2, 5]);
    const array = [5, 2];

    removeElementsInSet(array, set);

    assert.deepEqual(array, []);
  });

  it('shifts remaining elements towards the beginning', () => {
    const set = new Set([1, 3, 4, 6]);
    const array = [1, 2, 3, 4, 5, 6, 7];

    removeElementsInSet(array, set);

    assert.deepEqual(array, [2, 5, 7]);
  });
});
