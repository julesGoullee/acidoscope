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
  controllerIdMap: controllerId.reduce( (acc, item, i) => {

    acc[item] = i + 1;
    return acc;

  }, {}),
  isSupported: () => Boolean(navigator.requestMIDIAccess),
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
  isConnected: () => WebMidi.inputs && WebMidi.inputs.length > 0,
  onEvent: (handler) => {

    WebMidi.inputs.forEach( (input) => {

      input.addListener('controlchange', 'all', (event) => {

        if(Midi.controllerIdMap[event.controller.name]){

          handler(Midi.controllerIdMap[event.controller.name], event.value);

        }

      });

    });

  }
};

export default Midi;
