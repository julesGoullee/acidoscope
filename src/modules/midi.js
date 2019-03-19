import assert from 'assert';
import { EventEmitter } from 'events';
import WebMidi from 'webmidi';

const log = console.log.bind(null, '[MIDI]:');

class Midi extends EventEmitter {

  constructor() {
    super();
    this._isListening = false;
  }

  isSupported(){ return WebMidi.supported }

  init(){

    assert(this.isSupported(), 'web_midi_not_supported');

    WebMidi.enable( (error) => {

      if(error){

        return log(error);

      }

      WebMidi.addListener('connected', () => {
        log('Device connected');
        this.listenInputs();
        this.emit('statusChanged', true);

      });
      WebMidi.addListener('disconnected', () => {
        log('Device disconnected');
        this._isListening = false;
        this.emit('statusChanged', false);
      });

    }/*, true*/);

  }

  listenInputs(){

    if(this._isListening){
      return;
    }
    this._isListening = true;
    WebMidi.inputs.forEach( (input) => {

      input.addListener('controlchange', 'all', (event) => {

        const customEvent = {
          type: 'controlchange',
          controlName: event.controller.name,     // name is not always define, and can be wrong
          controlNumber: event.controller.number,
          value: event.value,
        };

        log(customEvent.type, customEvent.controlNumber, customEvent.value, customEvent.controlName);
        this.emit('input', customEvent);

      });

      function noteListener(event){

        const { channel, note, rawVelocity, velocity, type } = event;
        log(type, channel, note.name, rawVelocity, velocity);

      }
      input.addListener('noteon', 'all', noteListener);
      input.addListener('noteoff', 'all', noteListener);

    });

  }

  danceColors() {

    const output = WebMidi.getOutputByName('Ableton Push 2 User Port');
    const padStartNumber = 36;

    if(this.dancing) {
      this.dancing();
      this.dancing = false;

      for(let i=0; i<64; i++) {
        output.send(144, [padStartNumber+i, 122], 0);
      }

      return;
    }

    const colors = {
      red: 127,
      green: 126,
      blue: 125,
    };
    output.sendSysex([0, 33, 29], [1, 1, 10, 1]);

    function draw() {

      for(let i=0; i<64; i++) {
        const rand = Math.floor(Math.random() * 1000%3);
        let color;
        if(rand === 0) color = 'blue';
        if(rand === 1) color = 'green';
        if(rand === 2) color = 'red';
        output.send(144, [padStartNumber+i, colors[color]], 0);
      }

    }

    const interval = setInterval(draw, 100);
    this.dancing = () => clearInterval(interval);

  }

}

export default Midi;
