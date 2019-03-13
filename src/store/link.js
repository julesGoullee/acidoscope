import Link from '@/modules/link';

const LinkModule = {

  state: {
    linkEnabled: true,
    linkConnected: false,
    linkListener: null,
  },

  mutations: {

    setLinkEnabled: (state, enabled) => {
      state.linkEnabled = enabled;
    },
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
      commit('setLinkConnected', Link.isConnected);

      Link.listenStatus(linkStatus => {
        commit('setLinkConnected', linkStatus);
      });

    },

    listenLinkActions({ state, commit, dispatch } ) {

      if(state.linkListener) return;

      if(state.linkEnabled) {

        const listener = Link.addListener(({ paramName, value }) => {

          dispatch('changeParamValue', { paramName, action: 'value', value });

        });

        commit('setLinkListener', listener);

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
    linkEnabled: state => state.linkEnabled,
    linkConnected: state => state.linkConnected,
  },

};

export default LinkModule;
