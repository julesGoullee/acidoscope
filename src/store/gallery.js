import shaders from '@/shaders';

import router from '@/router';

const GalleryModule = {

  state: {
    visualizations: {},
  },

  mutations: {

    setVisualisations: (state, { visualizations }) => {

      state.visualizations = visualizations;

    },

  },

  actions: {

    loadVisualisations: ({ state, commit }) => {

      if(Object.keys(state.visualizations).length === 0){

        commit('setVisualisations', { visualizations: shaders } );

      }

    },

    goToGallery() {

      router.push({ path: '/' });

    },

  },

  getters: {

    visualizations: state => Object.keys(state.visualizations).reduce((acc, vizId) => acc.concat({...state.visualizations[vizId], id: vizId}), []),

  },

};

export default GalleryModule;
