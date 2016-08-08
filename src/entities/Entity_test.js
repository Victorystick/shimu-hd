import assert from 'assert';
import {Entity} from './Entity.js';
import {Vec2, Size} from '../core.js';
import {createArgSaver} from '../testing/mocks.js';

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

  it('is drawn centered around the position', () => {
    const context = {
      fillRect: createArgSaver()
    };

    const e = new Entity(new Vec2(30, 20), new Size(10, 10), 'red');

    e.draw(context);

    assert.equal(context.fillStyle, 'red');
    assert.deepEqual(context.fillRect.args, [25, 15, 10, 10]);
  });
});
