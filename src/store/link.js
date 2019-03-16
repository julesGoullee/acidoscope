import Link from '@/modules/link';

const link = new Link();

const LinkModule = {

  state: {
    linkConnected: false,
  },

  mutations: {

    setLinkStatus(state, linkConnected) {
      state.linkConnected = linkConnected;
    },

  },
  actions: {

    initLink({ commit, rootState }){

      link.init();

      link.on('statusChanged', (linkConnected) => {

        if(!linkConnected){

          rootState.shader.shaderEngine.shaderParams.setBeat({
            beatStartTime: 0,
            bps: 1,
            bpm: 60,
            beat: 0,
          });

        }

        commit('setLinkStatus', linkConnected);

      });

    },

    listenLinkActions({ rootState } ){

      link.on('beat', (beatData) => {

        rootState.shader.shaderEngine.shaderParams.setBeat(beatData);

      });

    },

    unlistenLinkActions() {

      link.removeAllListeners('beat');

    },

  },

  getters: {
    linkConnected: state => state.linkConnected,
  },

};

export default LinkModule;
