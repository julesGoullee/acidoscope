import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedVisualizationId: null,
    visualizations: []
  },
  mutations: {
    selectVisualization: (state, { id }) => {

      state.selectedVisualizationId = id;

    },
    loadVisualisations: (state, { visualizations }) => {

      state.visualizations = visualizations;

    }
  },
  actions: {

  }
})
