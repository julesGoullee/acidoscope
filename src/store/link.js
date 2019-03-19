import Link from '@/modules/link';
import { event } from 'vue-analytics';
import Config from '@/../config';

const link = new Link({ uri: `${Config.SERVER_HOST}:${Config.SERVER_PORT}` });

const LinkModule = {

  state: {
    linkConnected: false,
    numPeers: 0,
    linkEnabled: false
  },

  mutations: {

    setLinkStatus(state, linkConnected) {
      event('connection', 'link', 'status', linkConnected ? 1 : 0);
      state.linkConnected = linkConnected;
    },
    setNumPeers(state, numPeers) {
      state.numPeers = numPeers;
    },
    setLinkEnable(state, linkEnabled) {
      event('connection', 'link', 'enable', linkEnabled ? 1 : 0);
      state.linkEnabled = linkEnabled;
    },
  },
  actions: {

    initLink({ commit, dispatch }){

      link.init();

      link.on('statusChanged', (linkConnected) => {

        if(!linkConnected){

          commit('setNumPeers', 0 );
          dispatch('switchLinkEnable', false);

        }

        commit('setLinkStatus', linkConnected);

      });

      link.on('numPeers', (numPeers) => {

        commit('setNumPeers', numPeers);

      });

    },

    listenLinkActions({ rootState, state } ){

      link.on('beat', (beatData) => {

        if(state.linkEnabled){

          rootState.shader.shaderEngine.shaderParams.setBeat(beatData);

        }

      });

    },

    switchLinkEnable({ rootState, commit }, enable){

      if(enable){

        return commit('setLinkEnable', true);

      }

      if(rootState.shader.shaderEngine){

        rootState.shader.shaderEngine.shaderParams.setBeat({
          beatStartTime: 0,
          bps: 1,
          bpm: 60,
          beat: 0,
        });

      }

      commit('setLinkEnable', false);

    },

    unlistenLinkActions() {

      link.removeAllListeners('beat');

    },

  },

  getters: {
    linkConnected: state => state.linkConnected,
    numPeers: state => state.numPeers,
    linkEnabled: state => state.linkEnabled,
  },

};

export default LinkModule;
