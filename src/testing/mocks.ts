import * as assert from 'assert';

export interface ArgSaver {
  (...args: Array<any>) : any;
  times: number;
  args: Array<any>;
}

export function createArgSaver(returnValue?) {
  var saver = <ArgSaver>function(...args) {
    saver.args = args;
    saver.times++;
    return returnValue;
  }
  saver.times = 0;
  saver.args = [];
  
  return saver;
}

export class Mock {
  private mocks;
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
