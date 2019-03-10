import Vue from 'vue';
import Vuex from 'vuex';
import assert from 'assert';

// Businesses
import MidiLink from './midiLink';

// Modules
import ShaderEngine from '@/modules/ShaderEngine';
import shader1 from '@/shaders/shader1';

Vue.use(Vuex);

export const store = {
  state: Object.assign({
      selectedVisualization: null,
      visualizations: [],
      shaderEngine: null,
    },
    MidiLink.state
  ),
  mutations: Object.assign({

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

    },
    MidiLink.mutations
  ),
  actions: Object.assign({

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
    },
    MidiLink.actions,
  ),
  getters: Object.assign({

      selectedVisualization: state => state.selectedVisualization,
      visualizations: state => state.visualizations,
      shaderEngine: state => state.shaderEngine,

    },
    MidiLink.getters,
  ),
};

export default new Vuex.Store(store);
