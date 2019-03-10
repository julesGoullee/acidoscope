import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Home from '@/views/Home.vue';

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

  it('Should render logo', () => {

    const wrapper = shallowMount(Home, this.shallowConfig);
    expect(wrapper.contains('img') ).to.be.true;

  });

});
