import assert from 'assert';

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

    setQuality(state, quality) {
      state.shaderEngine.setQuality(quality);
    },

    setParamValue(state, { paramName, paramValue }) {

      state.shaderEngine.setParamValue(paramName, paramValue);

      state.paramsValue = {
        ...state.paramsValue,
        [paramName]: state.shaderEngine.getParamValue(paramName),
      };

    },

    createShaderEngine: (state, { shader, container }) => {

      state.shaderEngine = new ShaderEngine(shader, container);
      state.shaderEngine.init();
      state.shaderEngine.start();

      state.paramsList = [];
      state.paramsValue = {};

      state.shaderEngine.forParams((param) => {
        state.paramsList.push(param);
        state.paramsValue[param.name] = param.defaultValue;
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

      const param = state.shaderEngine.params[paramName];
      if(!param) throw new Error('Unknown shader parameter to change');

      const oldValue = state.shaderEngine.getParamValue(paramName);
      let newValue = oldValue;

      switch(action) {
        case 'up': {
          newValue = oldValue + param.step;
          break;
        }
        case 'down': {
          newValue = oldValue - param.step;
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

    takeScreenShot({ state }){

      state.shaderEngine.downloadScreenShot();

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

    setQuality({ commit }, qualityValue) {
      commit('setQuality', qualityValue);
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
    quality: state => state.shaderEngine ? state.shaderEngine.quality : 1,
    shaderRunning: state => state.running,
    paramsList: state => state.paramsList,
    getParamValue: state => paramName => {
      return state.paramsValue[paramName];
    },
  },

};

export default ShaderParamsModule;
