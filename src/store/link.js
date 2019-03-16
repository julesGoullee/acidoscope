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

    initLink({ commit }){

      link.init();

      link.on('statusChanged', (linkConnected) => {

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
