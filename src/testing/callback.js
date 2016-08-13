export class CallbackMock {
  constructor() {
    this.triggered = false;
    this.times = 0;
    this.correctarguments = null;
    this.expectedArgs = undefined;
    this.actualArgs = [];
    this.returnValue = undefined;
  }

  withArgs(...args) {
    this.expectedArgs = args;
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
      this.actualArgs = args;
      if (this.expectedArgs !== undefined) {
        this.correctarguments = this.checkArguments(args)
      }
      return this.returnValue;
    }
  }

  checkArguments(...args) {
    if (this.correctarguments === false) {
      return false;
    }

    if (args.length !== this.expectedArgs.length) {
      return false;
    }

    for (var i = 0; i < args.length; i++) {
      if (args[i] !== this.expectedArgs[i]) {
        return false;
      }
    }

    return true;
  }
}
