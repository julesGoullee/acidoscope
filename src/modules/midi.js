import WebMidi from 'webmidi';
import assert from 'assert';

const log = console.log.bind(null, '[MIDI]:');

const Midi = {
  isSupported: () => WebMidi.supported,
  isConnected: () => WebMidi.inputs && WebMidi.inputs.length > 0,
  status: {
    midiInitialized: false,
    midiHardwareConnected: false,
    dancing: false,
  },
  unlisteners: [],
  init: async () => {

    assert(Midi.isSupported(), 'web_midi_not_supported');
    if(Midi.status.midiInitialized) return Promise.resolve();

    return new Promise( (resolve, reject) => {

      WebMidi.enable( (error) => {

        if(error){

          reject(error);

        } else {

          Midi.midiInitialized = true;
          Midi.midiHardwareConnected = Midi.isConnected();
          Midi.listenStatus(hardwareStatus => {
            Midi.midiHardwareConnected = hardwareStatus.connected;
          });
          resolve();

        }

      }/*, true*/);

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

  addListener(handler) {

    let unlisteners = [];

    function stopListening() {
      unlisteners.forEach(u => u());
      unlisteners = null;
    }

    function startListening() {

      // Listen midi actions
      const unlistenEvents = Midi.onEvent(handler);
      unlisteners.push(unlistenEvents);

      // Listen midi disconnection, unlisten and listen to wait for new connection
      const unlistenStatus = Midi.listenStatus(hardwareStatus => {
        if(!hardwareStatus.connected) {
          stopListening();
          Midi.addListener(handler)
        }
      });
      unlisteners.push(unlistenStatus);

    }

    if(Midi.midiHardwareConnected) {

      // If already connected, start listening
      startListening();

    } else {

      // If not connected, wait connection then start listening
      const unlistenStatus = Midi.listenStatus(hardwareStatus => {
        if(hardwareStatus.connected) {
          startListening();
          unlistenStatus();
        }
      });
      Midi.unlisteners.push(unlistenStatus); // Maybe have been unlistened previously

    }

    return stopListening;

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

        // TODO target listeners
        input.removeListener('controlchange');
        input.removeListener('noteon');
        input.removeListener('noteoff');

      });

    };
  },

  danceColors() {

    const output = WebMidi.getOutputByName('Ableton Push 2 User Port');
    const padStartNumber = 36;

    if(Midi.dancing) {
      Midi.dancing();
      Midi.dancing = false;

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
    Midi.dancing = () => clearInterval(interval);

  }

};

export default Midi;
