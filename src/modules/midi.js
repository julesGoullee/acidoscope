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

const Midi = {
  isListening: false,
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

    if(Midi.isConnected() ){

      setMidiHardwareStatus({ midiHardwareConnected: true });

    }

    WebMidi.addListener('connected', () => setMidiHardwareStatus({ midiHardwareConnected: true }) );

    WebMidi.addListener('disconnected', () => setMidiHardwareStatus({ midiHardwareConnected: false }) );

    Midi.isListening = true;

  },
  onEvent: (handler) => {

    WebMidi.inputs.forEach( (input) => {

      input.addListener('controlchange', 'all', (event) => {

        if(Midi.controllerIdMap[event.controller.name]){

          const value = event.value < 126 ? 'down' : 'up';
          const id = Midi.controllerIdMap[event.controller.name];
          handler(`control${id}`, value);

        }

      });

    });

  }
};

export default Midi;
