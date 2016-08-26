import * as assert from 'assert';
import {Vec2} from './core';

describe('Vec2', () => {
  it('length', () => {
    const v1 = new Vec2(1, 0);
    assert.equal(v1.length(), 1);

    const v2 = new Vec2(0, 2);
    assert.equal(v2.length(), 2);

    const v3 = new Vec2(1, 2);
    assert.equal(v3.length(), 2.23606797749979);
  });

  it('normalize', () => {
    assert.equal(new Vec2(2, 7).normalize().length(), 1);
  });

  it('scale', () => {
    assert.equal(new Vec2(1, 0).scale(7).x, 7);
  });

  it('setLength', () => {
    assert.equal(new Vec2(0, 4).setLength(3).length(), 3);
  });
});
