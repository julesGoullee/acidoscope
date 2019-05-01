class Event {
  constructor(data) {
    this.data = data;
  }

  compare(event) {
    const match = event.match ? Object.entries(event.match).reduce((acc, [ key, value ]) =>
      acc && this.data[key] === value
      , true) : true;

    const matchFn = event.matchFn ? event.matchFn(this.data) : true;

    return match && matchFn;
  }
}

export default Event;
