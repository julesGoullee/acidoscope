import Link from '@/modules/link';

const link = new Link();

const LinkModule = {

  state: {
    linkConnected: false,
    linkEnabled: false
  },

  mutations: {

    setLinkStatus(state, linkConnected) {
      state.linkConnected = linkConnected;
    },
    setLinkEnable(state, linkEnabled) {
      state.linkEnabled = linkEnabled;
    },
  },
  actions: {

    initLink({ commit, dispatch }){

      link.init();

      commit('setLinkEnable', true);
      link.on('statusChanged', (linkConnected) => {

        if(!linkConnected){

          dispatch('switchLinkEnable', false);

        }

        commit('setLinkStatus', linkConnected);

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
    linkEnabled: state => state.linkEnabled,
  },

};

export default LinkModule;
