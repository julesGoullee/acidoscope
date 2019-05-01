import Input from './index';
import Event from '../event';

import Midi from '@/modules/midi';

class MidiInput extends Input {

  listen() {
    Midi.init();
    Midi.on('input', this._event.bind(this));
  }

  _event(midiAction) {
    const event = new Event({
      device: 'midi',
      type: midiAction.type,
      value: midiAction.value,
      controlName: midiAction.controlName,
      controlNumber: midiAction.controlNumber,
    });

    this.emit('event', event);
  }

  static controlPress(controlNumber) {
    return {
      match: {
        device: 'midi',
        type: 'controlchange',
        controlNumber,
        value: 127,
      },
    };
  }

  static encoderUp(controlNumber) {
    return {
      match: {
        device: 'midi',
        type: 'controlchange',
        controlNumber,
      },
      matchFn: event => event.value < 2,
    };
  }

  static encoderDown(controlNumber) {
    return {
      match: {
        device: 'midi',
        type: 'controlchange',
        controlNumber,
      },
      matchFn: event => event.value > 125,
    };
  }
}

export default MidiInput;
