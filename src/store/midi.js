import Midi from '@/modules/midi';

import ActionBridge from '@/modules/ActionBridge';
import MidiInput from '@/modules/ActionBridge/input/midi';
import ShaderOutput from '@/modules/ActionBridge/output/shader';

const MidiModule = {

  state: {
    midiHardwareConnected: false,
  },

  mutations: {

    setMidiHardwareConnected: (state, connected) => {
      state.midiHardwareConnected = connected;
    },

  },
  actions: {

    initMidi({ commit } ) {

      //midi.init();

      Midi.on('statusChanged', (hardwareConnected) => {

        commit('setMidiHardwareConnected', hardwareConnected);

      });

    },

    listenMidiActions({ rootState, commit }) {

      const midiInput = new MidiInput();
      const shaderOutput = new ShaderOutput(rootState.shader.shaderEngine);

      const actionBridge = new ActionBridge({
        input: midiInput,
        output: shaderOutput,
        links: [
          {
            input: MidiInput.controlPress(85),
            output: ShaderOutput.action('pause'),
          },
          {
            input: MidiInput.encoderUp(71),
            output: ShaderOutput.incrementUniform(0),
          },
          {
            input: MidiInput.encoderDown(71),
            output: ShaderOutput.decrementUniform(0),
          },
        ]
      });

      actionBridge.listen();

      commit('setActionBridge', { name: 'shader-midi', actionBridge });

    },

    unlistenMidiActions() {

      Midi.removeAllListeners('input');

    },

  },

  getters: {
    midiHardwareConnected: state => state.midiHardwareConnected,
  },

};

export default MidiModule;
