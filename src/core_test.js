import assert from 'assert';
import {Vec2, Size} from './core.js';

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

describe('Size', () => {
  describe('add', () => {
    it('returns the sum of two sizes', () => {
      const s1 = new Size(2,3);
      const s2 = new Size(7,11);

      s1.add(s2);
      assert.equal(s1.width, 9);
      assert.equal(s1.height, 14);

    });

    it ("does not mutate the argument", () => {
      const s1 = new Size(2,3);
      const s2 = new Size(4,9);
      s1.add(s2);

      assert.equal(s2.width, 4);
      assert.equal(s2.height, 9);
    });
  });

  describe('scale', () => {
    it('scales a size', () => {
      const size = new Size(5,7).scale(3);
      assert.equal(size.width, 15);
      assert.equal(size.height, 21);
    });
  });
});
