import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import App from '@/App.vue';
import router from '@/router';
import MidiLoader from '@/components/MidiLoader.vue';

describe('Views: App.vue', function () {

  beforeEach( () => {

    this.sandbox = createSandbox();
    this.localVue = createLocalVue();
    this.localVue.use(Vuex);

    this.shallowConfig = { localVue: this.localVue, router };

  });

  afterEach( () => {

    this.sandbox.restore();

  });

  it('Should render midiLoader', () => {

    const wrapper = shallowMount(App, this.shallowConfig);
    expect(wrapper.contains(MidiLoader) ).to.be.true;

  });

});
