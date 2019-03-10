import assert from 'assert';

import router from '@/router';
import ShaderEngine from '@/modules/ShaderEngine';
import shaders from '@/shaders';

const ShaderParamsModule = {

  state: {
    shaderEngine: null,
    paramsList: [],
    paramsValue: {},
  },

  mutations: {

    setParamValue(state, { paramName, paramValue }) {

      const shader = state.shaderEngine.shaderParams;
      shader.setUniformValue(paramName, paramValue);

      state.paramsValue = {
        ...state.paramsValue,
        [paramName]: shader.getUniformValue(paramName),
      };

    },

    createShaderEngine: (state, { shader, container }) => {

      state.shaderEngine = new ShaderEngine(shader, container);
      state.shaderEngine.init();
      state.shaderEngine.start();


      const shaderParams = state.shaderEngine.shaderParams;
      state.paramsValue = {};
      state.paramsList = [];
      shaderParams.forInitialParams(param => {
        if(param.special === ShaderEngine.SPECIALS.controllable) {
          state.paramsList.push(param);
          state.paramsValue[param.name] = param.defaultValue;
        }
      });

    },

    stopShaderEngine: (state) => {

      assert(state.shaderEngine, 'engine_not_exist');
      state.shaderEngine.stop();

    },

  },

  actions: {

    createShaderEngine: ({ commit, dispatch, rootState }, { container }) => {

      dispatch('loadVisualisations');

      assert(rootState.route && rootState.route.name === 'shader' && rootState.route.params && rootState.route.params.id, 'invalid_route');

      const shaderId = rootState.route.params.id;

      const shader = shaders[shaderId];

      if(!shader){

        router.push({ path: '/' });

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
    shaderEngine: state => state.shaderEngine,
    paramsList: state => state.paramsList,
    getParamValue: state => paramName => {
      return state.paramsValue[paramName];
    },
  },

};

export default ShaderParamsModule;
