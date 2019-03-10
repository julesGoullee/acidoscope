import Midi from '@/modules/midi';

const MidiLinkModule = {

  state: {
    midiHardwareConnected: false,
    midiListener: null,
    bindedParams: [
      {
        midiActionType: 'controlchange',
        controlNumber: 71,
        shaderParamIndex: 0,
      },
      {
        midiActionType: 'controlchange',
        controlNumber: 72,
        shaderParamIndex: 1,
      },
      {
        midiActionType: 'controlchange',
        controlNumber: 73,
        shaderParamIndex: 2,
      },
      {
        midiActionType: 'controlchange',
        controlNumber: 74,
        shaderParamIndex: 3,
      },
      {
        midiActionType: 'controlchange',
        controlNumber: 75,
        shaderParamIndex: 4,
      },
      {
        midiActionType: 'controlchange',
        controlNumber: 76,
        shaderParamIndex: 5,
      },
    ],
  },

  mutations: {

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

      commit('setMidiHardwareConnected', Midi.isConnected());
      Midi.listenStatus(hardwareStatus => {
        commit('setMidiHardwareConnected', hardwareStatus.connected);
      });

    },

    listenMidiActions({ state, commit, dispatch } ) {

      if(state.midiListener) return;

      const listener = Midi.addListener(midiAction => {
        dispatch('handleMidiAction', midiAction);
      });
      commit('setMidiListener', listener);

    },

    unlistenMidiActions({ state, commit } ) {

      if(!state.midiListening) return;
      state.midiListener();
      commit('setMidiListener', null);

    },

    handleMidiAction: ({ state, rootGetters, dispatch }, midiAction) => {

      const bindedParam = state.bindedParams.find(
        p => (
          p.midiActionType === midiAction.type &&
          p.controlNumber === midiAction.controlNumber
        )
      );
      if(!bindedParam) return;

      let paramName = null;
      if(bindedParam.shaderParamName !== undefined) {

        paramName = bindedParam.shaderParamName;

      } else if(bindedParam.shaderParamIndex !== undefined) {

        const param = rootGetters.paramsList[bindedParam.shaderParamIndex];
        if(!param) return;
        paramName = param.name;

      } else {

        throw new Error('Nothing to bind midi action to');

      }

      if(midiAction.type === 'controlchange') {

        if(midiAction.value === 1) {

          dispatch('changeParamValue', { paramName, action: 'up' })

        } else if(midiAction.value === 127) {

          dispatch('changeParamValue', { paramName, action: 'down' })

        }

      }

    },

  },

  getters: {
    midiHardwareConnected: state => state.midiHardwareConnected,
  },

};

export default MidiLinkModule;
