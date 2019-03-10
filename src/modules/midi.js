import WebMidi from 'webmidi';

const controllerId = [
  'resonance',
  'soundreleasetime',
  'soundattacktime',
  'brightness',
  'soundcontrol6',
  'soundcontrol7',
  'soundcontrol8',
  'soundcontrol9',
];

const log = console.log.bind(null, '[MIDI]:');

const Midi = {
  isSupported: () => WebMidi.supported,
  isConnected: () => WebMidi.inputs && WebMidi.inputs.length > 0,
  controllerIdMap: controllerId.reduce( (acc, item, i) => {

    acc[item] = i + 1;
    return acc;

  }, {}),
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

    WebMidi.addListener('connected', () => {
      log('Device connected');
      setMidiHardwareStatus({ connected: true })
    });
    WebMidi.addListener('disconnected', () => {
      log('Device disconnected');
      setMidiHardwareStatus({ connected: false })
    });

    return function() {

      WebMidi.removeListener('connected');
      WebMidi.removeListener('disconnected');

    };

  },
  onEvent: (handler) => {

    WebMidi.inputs.forEach( (input) => {

      input.addListener('controlchange', 'all', (event) => {

        const name = event.controller.name;
        const number = event.controller.number;
        const value = event.value;
        log('controlchange', number, name, value);

        const mappedName = Midi.controllerIdMap[event.controller.name];
        if(mappedName !== undefined){

          const parsedValue = event.value < 126 ? 'down' : 'up';
          handler(`control${mappedName}`, parsedValue);

        }

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
