import Midi from '@/modules/midi';

const MidiLinkModule = {

  state: {
    midiHardwareConnected: false,
    midiListener: null,
    bindedParams: [
      {
        midiActionType: 'controlchange',
        controlNumber: 71,
        shaderParamName: 'control1',
      }
    ]
  },

  mutations: {

    handleMidiAction: (state, midiAction) => {

      const bindedParam = state.bindedParams.find(
        p => (
          p.midiActionType === midiAction.type &&
          p.controlNumber === midiAction.controlNumber
        )
      );
      if(!bindedParam) return;

      const shaderParams = state.shaderEngine.shaderParams;
      const initialParams = shaderParams.initialParams;
      const initialParam = initialParams[bindedParam.shaderParamName];

      if(!initialParam) throw new Error('Midi action binded to unknown shader param');

      if(midiAction.type === 'controlchange') {
        if(midiAction.value === 127) {

          const newValue = shaderParams.getUniformValue(initialParam.name) + initialParam.step;
          shaderParams.setUniformValue(initialParam.name, newValue);

        } else if(midiAction.value === 1) {

          const newValue = shaderParams.getUniformValue(initialParam.name) - initialParam.step;
          shaderParams.setUniformValue(initialParam.name, newValue);

        }
      }
      // TODO store param in the store

    },
    setMidiHardwareConnected: (state, connected) => {
      state.midiHardwareConnected = connected;
    },
    setMidiListener(state, listener) {
      state.midiListener = listener;
    },

  },
  actions: {

    async initMidi({ commit } ) {

      await Midi.init();

      Midi.listenStatus(hardwareStatus => {
        commit('setMidiHardwareConnected', hardwareStatus.connected);
      });

    },

    listenMidiActions({ state, commit } ) {

      if(state.midiListener) return;

      const listener = Midi.addListener(midiAction => {
        commit('handleMidiAction', midiAction);
      });
      commit('setMidiListener', listener);

    },

    unlistenMidiActions({ state, commit } ) {

      if(!state.midiListening) return;
      state.midiListener();
      commit('setMidiListener', null);

    },

  },

  getters: {
    midiHardwareConnected: state => state.midiHardwareConnected,
  },

};

export default MidiLinkModule;
