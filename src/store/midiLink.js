import assert from 'assert';
import Midi from '@/modules/midi';

const midiChannelToShaderParam = {
  'control1': 'control1',
};

const MidiLink = {

  state: {
    midiInitialized: false,
    midiHardwareConnected: false,
    midiListening: false,
    unlisteners: [],
  },

  mutations: {

    handleMidiValue: (state, { controlId, value }) => {

      const shaderParams = state.shaderEngine.shaderParams;
      const paramName = midiChannelToShaderParam[controlId];
      const initialParams = shaderParams.initialParams;
      const initialParam = initialParams[paramName];

      if(!paramName || !initialParam) return;

      if(value === 'up') {

        const newValue = shaderParams.getUniformValue(controlId) + initialParam.step;
        shaderParams.setUniformValue(controlId, newValue);

      } else if(value === 'down') {

        const newValue = shaderParams.getUniformValue(controlId) - initialParam.step;
        shaderParams.setUniformValue(controlId, newValue);

      }

    },
    setMidiHardwareConnected: (state, connected) => {
      state.midiHardwareConnected = connected;
    },
    setMidiInitialized(state, initialized) {
      state.midiInitialized = initialized;
    },
    setMidiListening(state, listening) {
      state.midiListening = listening;
    },

    addUnlistener(state, unlistener) {
      state.unlisteners.push(unlistener);
    },

  },
  actions: {

    async initMidi({ state, commit } ) {

      if(state.midiInitialized) return;
      assert(Midi.isSupported(), 'web_midi_not_supported');

      await Midi.requestAccess();

      commit('setMidiHardwareConnected', Midi.isConnected());
      Midi.listenStatus(hardwareStatus => {
        commit('setMidiHardwareConnected', hardwareStatus.connected);
      });

      commit('setMidiInitialized', true);

    },

    listenMidi({ state, commit, dispatch } ) {

      if(state.midiListening) return;

      function startListening() {

        const unlistenEvents = Midi.onEvent( (controlId, value) => {
          commit('handleMidiValue', { controlId, value });
        });
        commit('addUnlistener', unlistenEvents);
        commit('setMidiListening', true);

        const unlistenStatus = Midi.listenStatus(hardwareStatus => {
          if(!hardwareStatus.connected) {
            dispatch('unlistenMidi');
            dispatch('listenMidi');
          }
        });
        commit('addUnlistener', unlistenStatus);

      }
      if(state.midiHardwareConnected) {
        startListening();
      } else {

        const unlistenStatus = Midi.listenStatus(hardwareStatus => {
          if(hardwareStatus.connected) {
            startListening();
            unlistenStatus();
          }
        });
        commit('addUnlistener', unlistenStatus);

      }

    },

    unlistenMidi({ state, commit } ) {

      if(!state.midiListening) return;
      state.unlisteners.forEach(u => u());
      state.unlisteners = [];
      commit('setMidiListening', false);

    },

  },

  getters: {
    midiHardwareConnected: state => state.midiHardwareConnected,
  },

};

export default MidiLink;
