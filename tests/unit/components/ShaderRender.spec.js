import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import { waitNextTick } from '@/../tests/unit/test.utils';

import ShaderRender from '@/components/ShaderRender.vue';
import ShaderEngine from '@/modules/ShaderEngine'

describe('Components: ShaderRender', function () {

  beforeEach(() => {

    this.sandbox = createSandbox();
    this.localVue = createLocalVue();
    this.localVue.use(Vuex);

    this.stubs = {
      actions: {
      },
      getters: {
      }
    };
    this.store = new Vuex.Store({
      actions: {
      },
      getters: {
      }
    });

    this.stubShaderEngineInit = this.sandbox.stub(ShaderEngine.prototype, 'init');
    this.stubShaderEngineStart = this.sandbox.stub(ShaderEngine.prototype, 'start');

    this.data = {
      shaderEngine: null,
    };

    this.shallowConfig = {
      data: () => ({ data: this.data }),
      store: this.store,
      localVue: this.localVue
    };

  });

  afterEach(() => {

    this.sandbox.restore();

  });

  describe('Mount', () => {

    it('Should create shader engine on mount', async () => {

      const wrapper = shallowMount(ShaderRender, this.shallowConfig);

      await waitNextTick(wrapper);

      expect(wrapper.vm.shaderEngine).to.be.an.instanceOf(ShaderEngine);
      expect(this.stubShaderEngineInit.calledOnce).to.be.true;
      expect(this.stubShaderEngineStart.calledOnce).to.be.true;

    });

  });

});
