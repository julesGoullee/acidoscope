import assert from 'assert';
import Midi from '@/modules/midi';

const midiChannelToShaderParam = {
  'control1': 'control1',
};

const MidiLink = {

  state: {
    midiInitialized: false,
    midiHardwareConnected: false,
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
    setMidiHardwareStatus: (state, connected) => {

      state.midiHardwareConnected = connected;

    },
    setMidiInitialized(state, initialized) {
      state.midiInitialized = initialized;
    },
  },
  actions: {

    async initMidi({ state, commit, dispatch } ) {

      if(state.midiInitialized) return;
      assert(Midi.isSupported(), 'web_midi_not_supported');

      await Midi.requestAccess();

      dispatch('setMidiHardwareStatus', Midi.isConnected());

      Midi.listenStatus(hardwareStatus => {
        dispatch('setMidiHardwareStatus', hardwareStatus.connected);
      });
      commit('setMidiInitialized', true);
    },

    setMidiHardwareStatus: ({ state, commit }, connected) => {

      if(state.midiHardwareConnected === connected) return;
      commit('setMidiHardwareStatus', connected);

      if(connected){

        Midi.onEvent( (controlId, value) => {

          commit('handleMidiValue', { controlId, value });

        });

      }

    },
  },

  getters: {
    midiHardwareConnected: state => state.midiHardwareConnected,
  },

};

export default MidiLink;
