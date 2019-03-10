import Vue from 'vue';
import Vuex from 'vuex';
import assert from 'assert';

// Businesses
import MidiLink from './midiLink';

// Modules
import router from '@/router';
import ShaderEngine from '@/modules/ShaderEngine';
import shader1 from '@/shaders/shader1';
import shader2 from '@/shaders/shader2';

const shaders = [
  shader1,
  shader2,
];


Vue.use(Vuex);

export const store = {
  state: Object.assign({
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
      createShaderEngine: (state, { shader, container }) => {

        state.shaderEngine = new ShaderEngine(shader, container);
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

          commit('setVisualisations', { visualizations: [ shader1, shader2 ]} );

        }

      },
      createShaderEngine: ({ state, commit, dispatch }, { container }) => {

        dispatch('loadVisualisations');

        assert(state.route && state.route.name === 'shader' && state.route.params && state.route.params.id, 'unknown_shader_id');

        const shader = shaders[parseInt(state.route.params.id, 10) - 1];

        if(!shader){

          router.push({ path: '/' });

          commit('createShaderEngine', { shader: shaders[0], container } );

        } else {

          commit('createShaderEngine', { shader, container } );

        }

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

      visualizations: state => state.visualizations,
      shaderEngine: state => state.shaderEngine,

    },
    MidiLink.getters,
  ),
};

export default new Vuex.Store(store);
