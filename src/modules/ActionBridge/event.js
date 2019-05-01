class Event {
  constructor(data) {
    this.device = data.device;
    this.type = data.type;
    this.value = data.value;
  }

  compare(event) {
    return Object.entries(event).reduce((acc, [ key, value ]) =>
      acc && this[key] === value
    , true);
  }
}

export default Event;
