import assert from 'assert';

import router from '@/router';
import ShaderEngine from '@/modules/ShaderEngine';
import shaders from '@/shaders';
import Midi from '@/modules/midi';

const ShaderParamsModule = {

  state: {
    shaderEngine: null,
    running: false,
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
      state.paramsList = [];
      state.paramsValue = {};

      shaderParams.forInitialParams(param => {
        if(!param.auto) {
          state.paramsList.push(param);
          state.paramsValue[param.name] = param.defaultValue;
        }
      });

    },

    setRunning: (state, running) => {
      state.running = running;
    },

  },

  actions: {

    createShaderEngine: ({ commit, dispatch, rootState }, { container }) => {

      dispatch('loadVisualisations');

      assert(rootState.route && rootState.route.name === 'shader' && rootState.route.params && rootState.route.params.id, 'invalid_route');

      const shaderId = rootState.route.params.id;

      const shader = shaders[shaderId];

      if(!shader){

        dispatch('goToGallery');

      } else {

        commit('createShaderEngine', { shader, container } );
        commit('setRunning', true);

      }

    },

    stopShaderEngine: ({ state }) => {


      if(state.shaderEngine){

        state.shaderEngine.stop();

      }

    },

    changeParamValue({state, commit}, { paramName, action, value }) {

      const initialParam = state.shaderEngine.shaderParams.initialParams[paramName];
      if(!initialParam) throw new Error('Unknown shader parameter to change');

      const oldValue = state.shaderEngine.shaderParams.getUniformValue(paramName);
      let newValue = oldValue;

      switch(action) {
        case 'up': {
          newValue = oldValue + initialParam.step;
          break;
        }
        case 'down': {
          newValue = oldValue - initialParam.step;
          break;
        }
        case 'value': {
          newValue = value;
          break;
        }
        default: {
          console.warn('Unknown shader change param action', action, paramName);
        }
      }

      commit('setParamValue', { paramName, paramValue: newValue });

    },

    pauseShader({ state, commit }) {
      if(state.running) {
        state.shaderEngine.stop();
        commit('setRunning', false);
      } else {
        state.shaderEngine.start();
        commit('setRunning', true);
      }
    },

    switchFullscreen({ state }) {

      if (document.fullscreenElement) {

        if(document.exitFullscreen) {
          document.exitFullscreen();
        }

      } else {

        // TODO requestFullscreen doesnt work on oculus, ios...
        const container = state.shaderEngine.container;
        if(container.requestFullscreen) {
          container.requestFullscreen();
        }
        if (container.requestFullScreen) {
          container.requestFullScreen();
        } else if (container.mozRequestFullScreen) {
          container.mozRequestFullScreen();
        } else if (container.webkitRequestFullScreen) {
          container.webkitRequestFullScreen( Element.ALLOW_KEYBOARD_INPUT );
        }
      }

    },

    handleAction({ dispatch }, { action }) {

      switch(action) {
        case 'pause': {
          dispatch('pauseShader');
          break;
        }
        case 'nyan': {
          Midi.danceColors();
          break;
        }
        default: {
          console.warn('Unknown shader handle action', action);

        }
      }
    },

  },

  getters: {
    shaderEngine: state => state.shaderEngine,
    shaderRunning: state => state.running,
    paramsList: state => state.paramsList,
    getParamValue: state => paramName => {
      return state.paramsValue[paramName];
    },
  },

};

export default ShaderParamsModule;
