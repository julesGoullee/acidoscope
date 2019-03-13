import Vue from 'vue';
import Vuex from 'vuex';

import GalleryModule from "./gallery";
import MidiLinkModule from "./midiLink";
import linkModule from "./link";
import ShaderModule from "./shader";

Vue.use(Vuex);

export const store = {

  modules: {
    gallery: GalleryModule,
    midiLink: MidiLinkModule,
    shader: ShaderModule,
    link: linkModule
  },

};

export default new Vuex.Store(store);
