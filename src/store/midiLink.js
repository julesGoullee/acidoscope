import assert from 'assert';
import Midi from '@/modules/midi';

const MidiLink = {

  state: {
    midiInitialized: false,
    midiHardwareConnected: false,
    midiListening: false,
    unlisteners: [],
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
    setMidiInitialized(state, initialized) {
      state.midiInitialized = initialized;
    },
    setMidiListening(state, listening) {
      state.midiListening = listening;
    },

    addUnlistener(state, unlistener) {
      state.unlisteners.push(unlistener);
    },
    cleanUnlisteners(state) {
      state.unlisteners = [];
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

        // Listen midi actions
        const unlistenEvents = Midi.onEvent( midiAction => {
          commit('handleMidiAction', midiAction);
        });
        commit('addUnlistener', unlistenEvents);
        commit('setMidiListening', true);

        // Listen midi diconnection, unlisten and listen to wait for new connection
        const unlistenStatus = Midi.listenStatus(hardwareStatus => {
          if(!hardwareStatus.connected) {
            dispatch('unlistenMidi');
            dispatch('listenMidi');
          }
        });
        commit('addUnlistener', unlistenStatus);

      }

      if(state.midiHardwareConnected) {

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
        commit('addUnlistener', unlistenStatus);

      }

    },

    unlistenMidi({ state, commit } ) {

      if(!state.midiListening) return;
      state.unlisteners.forEach(u => u());
      commit('cleanUnlisteners');
      commit('setMidiListening', false);

    },

  },

  getters: {
    midiHardwareConnected: state => state.midiHardwareConnected,
  },

};

export default MidiLink;
