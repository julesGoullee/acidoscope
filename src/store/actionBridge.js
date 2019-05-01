import ActionBridge from '@/modules/ActionBridge';
import KeyboardInput from '@/modules/ActionBridge/input/keyboard';
import StoreOutput from '@/modules/ActionBridge/output/store';

const ActionBridgeModule = {

  state: {
    actionBridges: {},
  },

  mutations: {

    setActionBridge: (state, { name, actionBridge }) => {
      state.actionBridges[name] = actionBridge;
    },

  },

  actions: {

    initActionBridge: ({ commit, dispatch }) => {

      const keyboardInput = new KeyboardInput();
      const storeOutput = new StoreOutput(dispatch);

      const actionBridge = new ActionBridge({
        input: keyboardInput,
        output: storeOutput,
        links: [
          {
            input: KeyboardInput.keypress('KeyG'),
            output: StoreOutput.action('goToGallery'),
          },
          {
            input: KeyboardInput.keypress('KeyP'),
            output: StoreOutput.action('nextVisualisation'),
          },
          {
            input: KeyboardInput.keypress('KeyC'),
            output: StoreOutput.action('switchDisplayFullScreenControl'),
          },
        ],
      });

      actionBridge.listen();

      commit('setActionBridge', { name: 'store', actionBridge });

    },

  },

  getters: {

  },

};

export default ActionBridgeModule;
