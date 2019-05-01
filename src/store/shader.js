import assert from 'assert';

import ShaderEngine from '@/modules/ShaderEngine';
import shaders from '@/shaders';
import Midi from '@/modules/midi';

import ActionBridge from '@/modules/ActionBridge';
import KeyboardInput from '@/modules/ActionBridge/input/keyboard';
import ShaderOutput from '@/modules/ActionBridge/output/shader';

const ShaderParamsModule = {

  state: {
    shaderEngine: null,
    paramsList: [],
    paramsValue: {},
  },

  mutations: {

    setQuality(state, quality) {
      state.shaderEngine.setQuality(quality);
    },

    setParamValue(state, { paramName, paramValue }) {

      const shaderParams = state.shaderEngine.shaderParams;
      shaderParams.setUniformValue(paramName, paramValue);

      state.paramsValue = {
        ...state.paramsValue,
        [paramName]: shaderParams.getUniformValue(paramName),
      };

    },

    createShaderEngine: (state, { shader, container }) => {

      state.shaderEngine = new ShaderEngine(shader, container);
      state.shaderEngine.init();
      state.shaderEngine.start();

      state.paramsList = [];
      state.paramsValue = {};

      state.shaderEngine.shaderParams.forInitialParams(param => {
        if(!param.auto) {
          state.paramsList.push(param);
          state.paramsValue[param.name] = param.defaultValue;
        }
      });

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

      }

      dispatch('initActionBridgeShader');

    },

    initActionBridgeShader: ({ state, commit }) => {

      const keyboardInput = new KeyboardInput();
      const shaderOutput = new ShaderOutput(state.shaderEngine);

      const actionBridge = new ActionBridge({
        input: keyboardInput,
        output: shaderOutput,
        links: [
          {
            input: KeyboardInput.keypress('KeyS'),
            output: ShaderOutput.action('takeScreenShot'),
          },
          {
            input: KeyboardInput.keypress('Space'),
            output: ShaderOutput.action('pause'),
          },
          {
            input: KeyboardInput.keypress('KeyF'),
            output: ShaderOutput.action('switchFullscreen'),
          },
        ]
      });

      actionBridge.listen();

      commit('setActionBridge', { name: 'shader', actionBridge });

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

    pauseShader({ state }) {
      if(!state.shaderEngine) return;
      state.shaderEngine.pause();
    },

    takeScreenShot({ state }){
      if(!state.shaderEngine) return;
      state.shaderEngine.downloadScreenShot();
    },

    switchFullscreen({ state }) {
      if(!state.shaderEngine) return;
      state.shaderEngine.switchFullscreen();
    },

    setQuality({ commit }, qualityValue) {
      commit('setQuality', qualityValue);
    },

    handleAction({ state }, { action }) {
      if(!state.shaderEngine) return;

      switch(action) {
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
    shaderRunning: state => state.shaderEngine && state.shaderEngine.running,
    paramsList: state => state.paramsList,
    getParamValue: state => paramName => {
      return state.paramsValue[paramName];
    },
  },

};

export default ShaderParamsModule;
