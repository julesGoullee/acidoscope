import Vue from 'vue'
import Vuex from 'vuex'
import shader1 from '@/shaders/shader1'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedVisualization: null,
    visualizations: []
  },
  mutations: {
    selectVisualization: (state, { visualization }) => {

      state.selectedVisualization = visualization;

    },
    setVisualisations: (state, { visualizations }) => {

      state.visualizations = visualizations;

    }
  },
  actions: {
    loadVisualisations:  async ({ state, commit }) => {

      if(state.visualizations.length === 0){

        commit('setVisualisations', { visualizations: [ shader1 ]} );

      }

      if(state.selectedVisualization === null){

        commit('selectVisualization', { visualization: shader1 } );

      }

    }
  },
  getters: {
    selectedVisualization: state => () => state.selectedVisualization,
    visualizations: state => state.visualizations,
  }
})
