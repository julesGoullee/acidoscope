import Midi from '@/modules/midi';

function encoderToUpDown(value) {
  if(value > 125) {
    return 'down';
  } else if(value < 2) {
    return 'up';
  }
  return null;
}

function touchToUpDown(value) {
  if(value === 127) {
    return 'down';
  }
  return null;
}

const midi = new Midi();

const MidiModule = {

  state: {
    midiHardwareConnected: false,
    bindedParams: [
      {
        midiActionType: 'controlchange',
        controlNumber: 71,
        shaderParamIndex: 0,
        type: 'uniform',
      },
      {
        midiActionType: 'controlchange',
        controlNumber: 72,
        shaderParamIndex: 1,
        type: 'uniform',
      },
      {
        midiActionType: 'controlchange',
        controlNumber: 73,
        shaderParamIndex: 2,
        type: 'uniform',
      },
      {
        midiActionType: 'controlchange',
        controlNumber: 74,
        shaderParamIndex: 3,
        type: 'uniform',
      },
      {
        midiActionType: 'controlchange',
        controlNumber: 75,
        shaderParamIndex: 4,
        type: 'uniform',
      },
      {
        midiActionType: 'controlchange',
        controlNumber: 76,
        shaderParamIndex: 5,
        type: 'uniform',
      },
      {
        midiActionType: 'controlchange',
        controlNumber: 85,
        type: 'action',
        action: 'pause',
      },
      {
        midiActionType: 'controlchange',
        controlNumber: 28,
        type: 'action',
        action: 'nyan',
      },
    ],
  },

  mutations: {

    setMidiHardwareConnected: (state, connected) => {
      state.midiHardwareConnected = connected;
    },

  },
  actions: {

    initMidi({ commit } ) {

      midi.init();

      midi.on('statusChanged', (hardwareConnected) => {

        commit('setMidiHardwareConnected', hardwareConnected);

      });

    },

    listenMidiActions({ dispatch }) {

      midi.on('input', (midiAction) => {
        dispatch('handleMidiAction', midiAction);
      });

    },

    unlistenMidiActions() {

      midi.removeAllListeners('input');

    },

    handleMidiAction: ({ state, rootGetters, dispatch }, midiAction) => {

      const bindedParam = state.bindedParams.find(
        p => (
          p.midiActionType === midiAction.type &&
          p.controlNumber === midiAction.controlNumber
        )
      );
      if(!bindedParam) return;

      if(bindedParam.type === 'uniform') {

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

          const upDownValue = encoderToUpDown(midiAction.value);

          if(upDownValue){

            dispatch('changeParamValue', { paramName, action: upDownValue })

          }

        }

      } else if(bindedParam.type === 'action') {

        const upDownValue = touchToUpDown(midiAction.value);
        if(upDownValue)
          dispatch('handleAction', { action: bindedParam.action })

      }

    },

  },

  getters: {
    midiHardwareConnected: state => state.midiHardwareConnected,
  },

};

export default MidiModule;
