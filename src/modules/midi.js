import WebMidi from 'webmidi';

const log = console.log.bind(null, '[MIDI]:');

const Midi = {
  isSupported: () => WebMidi.supported,
  isConnected: () => WebMidi.inputs && WebMidi.inputs.length > 0,
  requestAccess: async () => {

    return new Promise( (resolve, reject) => {

      WebMidi.enable( (error) => {

        if(error){

          reject(error);

        } else {

          resolve();

        }

      });

    });
  },
  listenStatus: (setMidiHardwareStatus) => {

    const connectedHandler = () => {
      log('Device connected');
      setMidiHardwareStatus({ connected: true });
    };
    const disconnectedHandler = () => {
      log('Device disconnected');
      setMidiHardwareStatus({ connected: false });
    };
    WebMidi.addListener('connected', connectedHandler);
    WebMidi.addListener('disconnected', disconnectedHandler);

    return function() {

      WebMidi.removeListener('connected', connectedHandler);
      WebMidi.removeListener('disconnected', disconnectedHandler);

    };

  },
  onEvent: (handler) => {

    WebMidi.inputs.forEach( (input) => {

      input.addListener('controlchange', 'all', (event) => {

        const customEvent = {
          type: 'controlchange',
          controlName: event.controller.name,     // name is not always define, and can be wrong
          controlNumber: event.controller.number,
          value: event.value,
        };
//      const parsedValue = event.value < 126 ? 'down' : 'up';

        log(customEvent.type, customEvent.controlNumber, customEvent.value, customEvent.controlName);
        handler(customEvent);

      });

      function noteListener(event) {
        const { channel, note, rawVelocity, velocity, type } = event;
        log(type, channel, note.name, rawVelocity, velocity);
      }
      input.addListener('noteon', 'all', noteListener);
      input.addListener('noteoff', 'all', noteListener);

    });

    return function() {

      WebMidi.inputs.forEach( (input) => {

        input.removeListener('controlchange');
        input.removeListener('noteon');
        input.removeListener('noteoff');

      });

    };
  }
};

export default Midi;
