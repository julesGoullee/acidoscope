import ActionBridge from '@/modules/ActionBridge';
import KeyboardInput from '@/modules/ActionBridge/input/keyboard';
import StoreOutput from '@/modules/ActionBridge/output/store';

const ActionBridgeModule = {

  state: {
    actionBridge: null,
  },

  mutations: {

    setActionBridge: (state, actionBridge) => {
      state.actionBridge = actionBridge;
    },

  },

  actions: {

    initActionBridge: ({ commit, dispatch }) => {

      const keyboardInput = new KeyboardInput();
      const storeOutput = new StoreOutput(dispatch);

      const actionBridge = new ActionBridge({
        input: keyboardInput,
        output: storeOutput,
      });

      actionBridge.createLinks([
        {
          input: KeyboardInput.keypress('Space'),
          output: StoreOutput.action('handleAction', {action: 'pause'}),
        },
        {
          input: KeyboardInput.keypress('KeyS'),
          output: StoreOutput.action('takeScreenShot'),
        },
        {
          input: KeyboardInput.keypress('KeyG'),
          output: StoreOutput.action('goToGallery'),
        },
        {
          input: KeyboardInput.keypress('KeyP'),
          output: StoreOutput.action('nextVisualisation'),
        },
      ]);

      actionBridge.listen();

      commit('setActionBridge', actionBridge);

    },

  },

  getters: {

  },

};

export default ActionBridgeModule;
