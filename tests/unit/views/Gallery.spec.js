import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Gallery from '@/views/Gallery.vue';

describe('Views: Gallery.vue', function () {

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

    const wrapper = shallowMount(Gallery, this.shallowConfig);
    expect(wrapper.contains('img') ).to.be.true;

  });

});
