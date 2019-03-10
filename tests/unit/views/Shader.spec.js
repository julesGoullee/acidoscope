import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import { waitNextTick } from '@/../tests/unit/test.utils';

import Shader from '@/views/Shader.vue';
import ShaderRender from '@/components/ShaderRender.vue';

describe('Views: Shader.vue', function () {

  beforeEach( () => {

    this.sandbox = createSandbox();
    this.localVue = createLocalVue();
    this.localVue.use(Vuex);

    this.stubs = {
      actions: {
        loadVisualisations: this.sandbox.stub().resolves(),
      },
      getters: {
        visualizations: this.sandbox.stub().returns([]),
        selectedVisualization: this.sandbox.stub().returns(null),
      }
    };

    this.store = new Vuex.Store({
      actions: {
        loadVisualisations: this.stubs.actions.loadVisualisations,
      },
      getters: {
        visualizations: this.stubs.getters.visualizations,
        selectedVisualization: this.stubs.getters.selectedVisualization,
      }
    });

    this.shallowConfig = { store: this.store, localVue: this.localVue };

  });

  afterEach( () => {

    this.sandbox.restore();

  });

  describe('Mount', () => {

    it('Should loadVisualisations on mount',() => {

      const wrapper = shallowMount(Shader, this.shallowConfig);

      expect(this.stubs.getters.visualizations.calledOnce).to.be.true;
      expect(this.stubs.actions.loadVisualisations.calledOnce).to.be.true;

      expect(wrapper.contains(ShaderRender) ).to.be.false;

    });

    it('Should not loadVisualisations on mount if visualisations exits',  async () => {

      this.stubs.getters.visualizations.returns(['v1']);
      this.stubs.getters.selectedVisualization.returns('selectedVisualization');

      const wrapper = shallowMount(Shader, this.shallowConfig);
      await waitNextTick(wrapper);

      expect(this.stubs.getters.visualizations.calledOnce).to.be.true;
      expect(this.stubs.actions.loadVisualisations.calledOnce).to.be.false;

      expect(wrapper.contains(ShaderRender) ).to.be.true;

    });

    it('Should listen full screen on mount', async () => {

      const spyFullScreen = this.sandbox.spy(document, 'addEventListener');
      const wrapper = shallowMount(Shader, this.shallowConfig);

      await waitNextTick(wrapper);

      expect(spyFullScreen.calledOnce).to.be.true;
      expect(spyFullScreen.args[0][0]).to.be.eq('fullscreenchange');
      expect(wrapper.contains('#fsbtn') ).to.be.true;

    });

  });

  it('Should contains ShaderRender when selectedVisualization',  async () => {

    this.stubs.getters.selectedVisualization.returns('selectedVisualization');

    const wrapper = shallowMount(Shader, this.shallowConfig);

    expect(wrapper.contains(ShaderRender) ).to.be.true;

  });

});
