import assert from 'assert';

import router from '@/router';
import ShaderEngine from '@/modules/ShaderEngine';
import shaders from '@/shaders';

const GalleryModule = {

  state: {
    visualizations: {},
    shaderEngine: null,
  },

  mutations: {

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

  actions: {
    loadVisualisations: ({ state, commit }) => {

      if(Object.keys(state.visualizations).length === 0){

        commit('setVisualisations', { visualizations: shaders } );

      }

    },
    createShaderEngine: ({ commit, dispatch, rootState }, { container }) => {

      dispatch('loadVisualisations');

      console.log(rootState)
      assert(rootState.route && rootState.route.name === 'shader' && rootState.route.params && rootState.route.params.id, 'invalid_route');

      const shaderId = rootState.route.params.id;

      const shader = shaders[shaderId];

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

  getters: {

    visualizations: state => Object.keys(state.visualizations).reduce((acc, vizId) => acc.concat({...state.visualizations[vizId], id: vizId}), []),
    shaderEngine: state => state.shaderEngine,

  },

};

export default GalleryModule;
