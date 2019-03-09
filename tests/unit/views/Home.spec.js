import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Home from '@/views/Home.vue';
import MidiLoader from '@/components/MidiLoader.vue';

describe('Views: Home.vue', function () {

  beforeEach( () => {

    this.sandbox = createSandbox();
    this.localVue = createLocalVue();
    this.localVue.use(Vuex);

    this.shallowConfig = { localVue: this.localVue };

  });

  afterEach( () => {

    this.sandbox.restore();

  });

  it('Should render MidiLoader', () => {

    const wrapper = shallowMount(Home, this.shallowConfig);
    expect(wrapper.contains(MidiLoader) ).to.be.true;

  });

});
