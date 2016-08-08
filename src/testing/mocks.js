import assert from 'assert';

export function createArgSaver(returnValue) {
  return function saver(...args) {
    saver.args = args;
    return returnValue;
  }
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
