import Vue from 'vue'
import Vuex from 'vuex'

import ShaderEngine from '@/modules/ShaderEngine'
import shader1 from '@/shaders/shader1'

Vue.use(Vuex);

export const store = {
  state: {
    selectedVisualization: null,
    visualizations: [],
    shaderEngine: null,
    midiValues: {},
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

      state.shaderEngine.stop();

    },
    setMidiValue: (state, { entry, value }) => {

      // state.midiValues[entry] = value;

      const param = state.shaderEngine.shader.params.find(param => param.name === entry);

      if(!param){

        return;

      }


      if(value === 'up'){

        state.shaderEngine.uniforms[entry].value += param.gap;

      } else {

        state.shaderEngine.uniforms[entry].value -= param.gap;

      }

    }
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
    setMidiValue: ({ state, commit }, { entry, value }) => {

      if(state.shaderEngine){

        commit('setMidiValue', { entry, value} );

      }

    }
  },
  getters: {
    selectedVisualization: state => state.selectedVisualization,
    visualizations: state => state.visualizations,
    shaderEngine: state => state.shaderEngine,
    midiValues: state => state.midiValues,
    midiHardwareConnected: state => state.midiHardwareConnected,
  }
};

export default new Vuex.Store(store);
