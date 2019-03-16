import Link from '@/modules/link';

const link = new Link();

const LinkModule = {

  state: {
    linkConnected: false,
  },

  mutations: {

    setLinkConnected(state, connected) {
      state.linkConnected = connected;
    },

  },
  actions: {

    initLink({ commit } ){

      link.init();

      link.on('statusChanged', (linkStatus) => {

        commit('setLinkConnected', linkStatus);

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
