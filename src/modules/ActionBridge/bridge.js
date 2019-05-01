class Bridge {
  constructor(params) {

    this.input = params.input;
    this.output = params.output;

    // TODO clear listeners
    this.links = [];
  }

  listen() {
    this.input.on('event', this.handleEvent.bind(this));
    this.input.listen();
  }

  /**
   * Check for matching inputEvent and emit outputEvent to output
   * @param {Event} event
   */
  handleEvent(event) {
    this.links.forEach(link => {
      if(event.compare(link.inputEvent)) {
        this.output.emit('event', link.outputEvent);
      }
    });
  }

  createLink(inputEvent, outputEvent) {
    this.links.push({
      inputEvent,
      outputEvent,
    });
  }

  createLinks(links) {
    links.forEach(link => {
      this.createLink(link.input, link.output);
    });
  }
}

export default Bridge;
