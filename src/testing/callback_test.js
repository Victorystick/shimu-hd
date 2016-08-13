import assert from 'assert';
import {CallbackMock} from './callback.js';

describe('CallbackMock', () => {
  it('Records that a call has been made', () => {
    const call = new CallbackMock();
    assert(!call.triggered, 'Not triggered too early');
    call.callback()();
    assert(call.triggered);
  });

  it('Records the number times it has been called', () => {
    const call = new CallbackMock();
    assert.equal(0, call.times);
    for (var i = 1; i < 10; i++) {
      call.callback()();
      assert.equal(i, call.times);
    }
  });

  const obj = {test: "dummy"};

  it('Checks that the correct arguments was passed', () => {
    const call = new CallbackMock().withArgs(1, true, obj, CallbackMock);
    assert.equal(call.checkArguments(1,true,obj, CallbackMock), true);
  });

  it('Warns that incorrect arguments was passed', () => {
    const call = new CallbackMock().withArgs(1, true, obj);
    assert.equal(call.checkArguments(1, false, obj), false);
  });

  it('Insists on incorrect arguments when at least one of the calls is bad', () => {
    const call = new CallbackMock().withArgs(1, true, obj);
    call.callback()(1,false,obj);
    assert(!call.correctarguments);
    call.callback()(1,true,obj);
    assert(!call.correctarguments);
  })
});
