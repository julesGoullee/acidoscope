import EventEmitter from 'events';

class FnOutput extends EventEmitter {
  constructor() {
    super();

    this.on('event', outputEvent => outputEvent.fn())
  }

  static exec(fn) {
    return { fn };
  }
}

export default FnOutput;
