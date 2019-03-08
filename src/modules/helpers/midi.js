import WebMidi from 'webmidi';

const Midi = {
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

      input.addListener('controlchange', 'all', (e) => {

        const event = {
          channel: e.channel,
          controller: e.controller,
          type: e.type,
          value: e.value,
          input: {
            id: e.target.id,
            name: e.target.name
          }
        };

        handler(event);

      });

      const events = [
        'noteoff',
        'noteon',
        'keyaftertouch',
        'controlchange',
        'channelmode',
        'programchange',
        'channelaftertouch',
        'pitchbend',

        'sysex',
        'timecode',
        'songposition',
        'songselect',
        'tuningrequest',
        'clock',
        'start',
        'continue',
        'stop',
        'activesensing',
        'reset',
        'midimessage',
        'unknownsystemmessage',
      ];

      events.forEach(event => {

        input.addListener(event, 'all', (e) => {

          console.log(event, e);

        });
      });

    });

  }
};

export default Midi;
