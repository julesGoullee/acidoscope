import shaders from '@/shaders';

import router from '@/router';

const GalleryModule = {

  state: {
    visualizations: {},
    selectedVisualization: null,
  },

  mutations: {

    setVisualisations: (state, visualizations) => {

      state.visualizations = visualizations;

    },

    setVisualisation(state, visualisation) {

      state.selectedVisualization = visualisation;

    },

  },

  actions: {

    loadVisualisations: ({ state, commit }) => {

      if(Object.keys(state.visualizations).length === 0){

        commit('setVisualisations', shaders );

      }

    },

    setVisualisation({ state, commit }, name) {

      const visualisation = state.visualizations[name];
      if(visualisation) {
        commit('setVisualisation', visualisation);
      } else {
        throw new Error(`Unknown visualisation ${name}`);
      }

    },

    goToGallery() {

      router.push({ path: '/' });

    },

  },

  getters: {

    visualizationsArray: state => Object.keys(state.visualizations).reduce((acc, vizId) => acc.concat({...state.visualizations[vizId], id: vizId}), []),
    selectedVisualization: state => state.selectedVisualization,

  },

};

export default GalleryModule;
