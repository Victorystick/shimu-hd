export class AsyncCall {
  constructor() {
    this.triggered = false;
    this.times = 0;
    this.correctarguments = null;
    this.args = [];
    this.returnValue = undefined;
  }

  withArgs(...args) {
    this.args = args;
    return this;
  }

  returns(val) {
    this.returnValue = val;
    return this;
  }

  callback() {
    return (...args) => {
      this.triggered = true;
      this.times += 1;
      this.correctarguments = this.checkArguments(args)
      return this.returnValue;
    }
  }

  checkArguments(...args) {
    if (this.correctarguments === false) {
      return false;
    }

    if (args.length !== this.args.length) {
      return false;
    }

    for (var i = 0; i < args.length; i++) {
      if (args[i] !== this.args[i]) {
        return false;
      }
    }

    return true;
  }
}
