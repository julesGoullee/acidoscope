import Link from '@/modules/link';

const LinkModule = {

  state: {
    linkConnected: false,
    linkListener: null,
  },

  mutations: {

    setLinkConnected(state, connected) {
      state.linkConnected = connected;
    },
    setLinkListener(state, listener) {
      state.linkListener = listener;
    },

  },
  actions: {

    async initLink({ commit } ) {

      await Link.init();

      Link.listenStatus(linkStatus => {
        commit('setLinkConnected', linkStatus);
      });

    },

    listenLinkActions({ rootState, state, commit, dispatch } ) {

      if(state.linkListener) return;

      if(state.linkConnected) {

        const listener = Link.addListener(beatData => {

          rootState.shader.shaderEngine.shaderParams.setBeat(beatData);

        });

        commit('setLinkListener', listener);

      } else {

        Link.listenStatus(linkStatus => {
          if(linkStatus) {
            dispatch('listenLinkActions');
          }
        });

      }

    },

    unlistenLinkActions({ state, commit } ) {

      if(state.linkListener) {
        state.linkListener();
        commit('setLinkListener', null);
      }

    },

  },

  getters: {
    linkConnected: state => state.linkConnected,
  },

};

export default LinkModule;
