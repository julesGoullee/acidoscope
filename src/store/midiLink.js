import Midi from '@/modules/midi';
import io from 'socket.io-client';

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

const MidiLinkModule = {

  state: {
    midiEnabled: false,
    midiHardwareConnected: false,
    midiListener: null,
    midiListenerRetrier: null,
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

    setMidiEnabled: (state, enabled) => {
      state.midiEnabled = enabled;
    },
    setMidiHardwareConnected: (state, connected) => {
      state.midiHardwareConnected = connected;
    },
    setMidiListener(state, listener) {
      state.midiListener = listener;
    },
    setMidiListenerRetrier(state, listener) {
      state.midiListenerRetrier = listener;
    },

  },
  actions: {

    async initMidi({ commit } ) {

      await Midi.init();
      commit('setMidiEnabled', true);

      commit('setMidiHardwareConnected', Midi.isConnected());
      Midi.listenStatus(hardwareStatus => {
        commit('setMidiHardwareConnected', hardwareStatus.connected);
      });

      //Midi.danceColors();

    },

    listenMidiActions({ state, commit, dispatch } ) {

      if(state.midiListener) return;

      const socket = io.connect('http://192.168.1.3:3000');

      socket.on('beat', (data) => {

        const bps = data.bpm / 60;
        dispatch('changeParamValue', { paramName: 'beat', action: 'value', value: data.beat });
        dispatch('changeParamValue', { paramName: 'beatStartTime', action: 'value', value: data.beatStartTime });
        dispatch('changeParamValue', { paramName: 'speed', action: 'value', value: bps });

      });

      if(state.midiEnabled) {

        const listener = Midi.addListener(midiAction => {
          dispatch('handleMidiAction', midiAction);
        });
        commit('setMidiListener', listener);

      } else {
        // TODO move that back into the midi helper
        const timeout = setTimeout(() => dispatch('listenMidiActions'), 1000);
        const clear = () => clearTimeout(timeout);
        commit('setMidiListenerRetrier', clear);
      }

    },

    unlistenMidiActions({ state, commit } ) {

      if(state.midiListenerRetrier) {
        state.midiListenerRetrier();
        commit('setMidiListenerRetrier', null);
      }
      if(state.midiListener) {
        state.midiListener();
        commit('setMidiListener', null);
      }

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

          dispatch('changeParamValue', { paramName, action: upDownValue })

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

export default MidiLinkModule;
