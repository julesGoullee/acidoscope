import Vue from 'vue'
import Vuex from 'vuex'
import assert from 'assert'

import Midi from '@/modules/helpers/midi';
import ShaderEngine from '@/modules/ShaderEngine'
import shader1 from '@/shaders/shader1'

Vue.use(Vuex);

export const store = {
  state: {
    selectedVisualization: null,
    visualizations: [],
    shaderEngine: null,
    midiHardwareConnected: false,
  },
  mutations: {

    selectVisualization: (state, { visualization }) => {

      state.selectedVisualization = visualization;

    },
    setVisualisations: (state, { visualizations }) => {

      state.visualizations = visualizations;

    },
    createShaderEngine: (state, { container }) => {

      state.shaderEngine = new ShaderEngine(shader1, container);
      state.shaderEngine.init();
      state.shaderEngine.start();

    },
    stopShaderEngine: (state) => {

      assert(state.shaderEngine, 'engine_not_exist');
      state.shaderEngine.stop();

    },
    setMidiValue: (state, { controlId, value }) => {

      const param = state.shaderEngine.shader.params.find(param => param.name === controlId);

      if(!param){

        return;

      }

      if(value === 'up'){

        state.shaderEngine.uniforms[controlId].value += param.gap;

      } else {

        state.shaderEngine.uniforms[controlId].value -= param.gap;

      }

    },
    setMidiHardwareStatus: (state, { midiHardwareConnected }) => {

      state.midiHardwareConnected = midiHardwareConnected;

    },
  },
  actions: {

    loadVisualisations: ({ state, commit }) => {

      if(state.visualizations.length === 0){

        commit('setVisualisations', { visualizations: [ shader1 ]} );

      }

      if(state.selectedVisualization === null){

        commit('selectVisualization', { visualization: shader1 } );

      }

    },
    createShaderEngine: ({ commit }, { container }) => {

      commit('createShaderEngine', { container } );

    },
    stopShaderEngine: ({ state, commit }) => {

      if(state.shaderEngine){

        commit('stopShaderEngine');

      }

    },
    setMidiValue: ({ state, commit }, { controlId, value }) => {

      if(state.shaderEngine){

        commit('setMidiValue', { controlId, value} );

      }

    },
    setMidiHardwareStatus: ({ state, commit, dispatch }, { midiHardwareConnected }) => {

      if(state.midiHardwareConnected === midiHardwareConnected){

        return false;

      }

      commit('setMidiHardwareStatus', { midiHardwareConnected });

      if(midiHardwareConnected){

        Midi.onEvent( (controlId, value) => {

          dispatch('setMidiValue', { controlId, value });

        });

      }

    }
  },
  getters: {
    selectedVisualization: state => state.selectedVisualization,
    visualizations: state => state.visualizations,
    shaderEngine: state => state.shaderEngine,
    midiHardwareConnected: state => state.midiHardwareConnected,
  }
};

export default new Vuex.Store(store);
