import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import ShaderRender from '@/components/ShaderRender.vue';

describe('Components: ShaderRender', function (){

  beforeEach(() => {

    this.sandbox = createSandbox();
    this.localVue = createLocalVue();
    this.localVue.use(Vuex);

    this.stubs = {
      actions: {
        createShaderEngine: this.sandbox.stub(),
        stopShaderEngine: this.sandbox.stub(),
      }
    };
    this.store = new Vuex.Store({
      actions: {
        createShaderEngine: this.stubs.actions.createShaderEngine,
        stopShaderEngine: this.stubs.actions.stopShaderEngine,
      }
    });

    this.shallowConfig = { store: this.store,  localVue: this.localVue};

  });

  afterEach(() => {

    this.sandbox.restore();

  });

  describe('Mount', () => {

    it('Should create shader engine on mount', async () => {

      const wrapper = shallowMount(ShaderRender, this.shallowConfig);

      expect(this.stubs.actions.createShaderEngine.calledOnce).to.be.true;
      expect(wrapper.contains('#shader-container') ).to.be.true;

    });

    it('Should stop shader engine on destroy', async () => {

      const wrapper = shallowMount(ShaderRender, this.shallowConfig);

      wrapper.destroy();
      expect(this.stubs.actions.stopShaderEngine.calledOnce).to.be.true;

    });

  });

});
