import assert from 'assert';

export function createArgSaver(returnValue) {
  function saver(...args) {
    saver.args = args;
    saver.times++;
    return returnValue;
  }
  saver.times = 0;
  return saver;
}

export class Mock {
  constructor() {
    this.mocks = [];
  }

  funcMock(retValue, expected) {
    const i = this.mocks.push(false) - 1;

    return (...actual) => {
      assert.deepEqual(actual, expected);
      this.mocks[i] = true;
      return retValue;
    };
  }

  verify() {
    return this.mocks.every(identity);
  }
}

function identity(x) {
  return x;
}
