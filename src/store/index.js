import Vue from 'vue';
import Vuex from 'vuex';

import GalleryModule from "./gallery";
import MidiLinkModule from "./midiLink";
import ShaderParamsModule from "./shaderParams";

Vue.use(Vuex);

export const store = {

  modules: {
    gallery: GalleryModule,
    midiLink: MidiLinkModule,
    shaderParams: ShaderParamsModule,
  },

};

export default new Vuex.Store(store);
