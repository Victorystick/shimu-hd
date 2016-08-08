import assert from 'assert';
import {Entity} from './Entity.js';
import {Vec2, Size} from '../core.js';

describe('Entity', () => {
  it('intersects', () => {
    const size = new Size(10, 5);

    const e1 = new Entity(new Vec2(0, 0), size, null);
    const e2 = new Entity(new Vec2(9, 4), size, null);
    const e3 = new Entity(new Vec2(10, 0), size, null);

    assert(e1.intersects(e1), 'things should intersect themselves');

    assert(e1.intersects(e2), 'should intersect');

    assert(!e1.intersects(e3), 'should not intersect');

    assert(e2.intersects(e3), 'should intersect');
  });
});
