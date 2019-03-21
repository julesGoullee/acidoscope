import shaders from '@/shaders';

import router from '@/router';

const GalleryModule = {

  state: {
    visualizations: {},
    selectedVisualizationId: null,
  },

  mutations: {

    setVisualisations: (state, visualizations) => {

      state.visualizations = visualizations;

    },

    setVisualisationId(state, visualisationId) {

      state.selectedVisualizationId = visualisationId;

    },

  },

  actions: {

    loadVisualisations: ({ state, commit }) => {

      if(Object.keys(state.visualizations).length === 0){

        commit('setVisualisations',
          Object.keys(shaders).reduce((acc, shaderId) =>
              ({
                ...acc,
                [shaderId]: {
                  ...shaders[shaderId],
                  id: shaderId,
                }
              })
            , {}
          ));
      }

    },

    setVisualisation({ state, commit }, visualisationId) {

      const visualisation = state.visualizations[visualisationId];
      if(visualisation) {
        commit('setVisualisationId', visualisationId);
      } else {
        throw new Error(`Unknown visualisation ${visualisationId}`);
      }

    },

    nextVisualisation({ state }) {

      const visualizations = state.visualizations;
      const visualizationId = state.selectedVisualizationId;
      const ids = Object.keys(visualizations);
      const indexOfCurrent = ids.indexOf(visualizationId);
      const nextIndex = (indexOfCurrent + 1) % (ids.length - 1);

      const nextVizualisationId = ids[nextIndex];
      router.push({ path: '/' });
      setImmediate(() => {
        router.push({ path: `/shader/${nextVizualisationId}` });
      });

    },

    goToGallery() {

      router.push({ path: '/' });

    },

  },

  getters: {

    visualizationsArray: state => Object.keys(state.visualizations).reduce((acc, vizId) => acc.concat(state.visualizations[vizId]), []),
    selectedVisualization: state => state.selectedVisualizationId ? state.visualizations[state.selectedVisualizationId] : null,

  },

};

export default GalleryModule;
