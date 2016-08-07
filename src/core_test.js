import assert from 'assert';
import {Vec2} from './core.js';

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
    const v1 = new Vec2(2, 7);
    v1.normalize();
    assert.equal(v1.length(), 1);
  });

  it('scale', () => {
    const v1 = new Vec2(1, 0);
    v1.scale(7);
    assert.equal(v1.x, 7);
  });
});
