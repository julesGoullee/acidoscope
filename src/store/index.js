import Vue from 'vue';
import Vuex from 'vuex';

import plugins from '@/store/plugins';
import GalleryModule from "./gallery";
import linkModule from "./link";
import ShaderModule from "./shader";
import MidiModule from "./midi";

Vue.use(Vuex);

export const store = {

  modules: {
    gallery: GalleryModule,
    midi: MidiModule,
    shader: ShaderModule,
    link: linkModule
  },
  plugins,

};

export default new Vuex.Store(store);
