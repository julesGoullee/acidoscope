import Input from './index';
import Event from '../event';

class KeyboardInput extends Input {

  listen() {
    window.addEventListener('keypress', this._listenerKeyPress.bind(this));
  }

  _listenerKeyPress(e) {
    this._event('keypress', e.code);
  }

  _event(type, value) {
    const event = new Event({
      device: 'keyboard',
      type,
      value,
    });

    this.emit('event', event);
  }

  static keypress(code) {
    return {
      device: 'keyboard',
      value: code,
    };
  }
}

export default KeyboardInput;
