import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { cloneDeep } from 'lodash';

import { store } from '@/store';
import ShaderEngine from '@/modules/ShaderEngine'
import shader1 from '@/shaders/shader1'

describe('Store', function (){

  beforeEach( () => {

    this.sandbox = createSandbox();
    this.store = new Vuex.Store(cloneDeep(store) );
    this.localVue = createLocalVue();
    this.localVue.use(Vuex);
    this.stubShaderEngineInit = this.sandbox.stub(ShaderEngine.prototype, 'init');
    this.stubShaderEngineStart = this.sandbox.stub(ShaderEngine.prototype, 'start');

  });

  afterEach( () => {

    this.sandbox.restore();

  });

  describe('State', () => {

    it('Should get state', () => {

      expect(this.store.state.selectedVisualization).to.be.eq(null);
      expect(this.store.state.visualizations).to.be.deep.eq([]);
      expect(this.store.state.shaderEngine).to.be.eq(null);
      expect(this.store.state.midiHardwareConnected).to.be.eq(false);

    });

  });

  describe('Mutations', () => {

    it('Should select visualization', () => {

      store.mutations.selectVisualization(this.store.state, { visualization: 'visualization'});
      expect(this.store.state.selectedVisualization).to.be.eq('visualization');

    });

    it('Should set visualizations', () => {

      store.mutations.selectVisualization(this.store.state, { visualization: ['v1', 'v2'] });
      expect(this.store.state.selectedVisualization).to.be.deep.eq(['v1', 'v2']);

    });

    it('Should create shaderEngine', () => {

      store.mutations.createShaderEngine(this.store.state, { container: 'container' });
      expect(this.store.state.shaderEngine).to.be.an.instanceOf(ShaderEngine);
      expect(this.stubShaderEngineInit.calledOnce).to.be.true;
      expect(this.stubShaderEngineStart.calledOnce).to.be.true;

    });

    it('Should create shaderEngine', () => {

      store.mutations.createShaderEngine(this.store.state, { container: 'container' });
      expect(this.store.state.shaderEngine).to.be.an.instanceOf(ShaderEngine);
      expect(this.stubShaderEngineInit.calledOnce).to.be.true;
      expect(this.stubShaderEngineStart.calledOnce).to.be.true;

    });

    it('Should stop shaderEngine', () => {

      this.store.state.shaderEngine = {
        stop: this.sandbox.stub()
      };

      store.mutations.stopShaderEngine(this.store.state);
      expect(this.store.state.shaderEngine.stop.calledOnce).to.be.true;

    });

    it('Cannot stop shaderEngine if not exist', () => {

      expect( () => store.mutations.stopShaderEngine(this.store.state) ).to.throws(Error, 'engine_not_exist');

    });

    it('Should set midi value', () => {

      // TODO

    });

  });

  describe('Actions', () => {

    beforeEach( () => {

      this.actionArgs = {
        state: this.store.state,
        commit: this.sandbox.stub(),
        dispatch: this.sandbox.stub()
      };

    });

    describe('loadVisualisations', () => {

      it('Should load visualizations', () => {

        store.actions.loadVisualisations(this.actionArgs);
        expect(this.actionArgs.commit.callCount).to.be.eq(2);
        expect(this.actionArgs.commit.args[0]).to.be.deep.eq([
          'setVisualisations',
          { visualizations: [ shader1 ]}
        ]);

        expect(this.actionArgs.commit.args[1]).to.be.deep.eq([
          'selectVisualization',
          { visualization: shader1 }
        ]);

      });

      it('Should do nothing if visualisations set and selected set', () => {

        this.store.state.visualizations = ['v1', 'v2'];
        this.store.state.selectedVisualization = ['selectedVisualization'];
        store.actions.loadVisualisations(this.actionArgs);
        expect(this.actionArgs.commit.callCount).to.be.eq(0);

      });

      it('Should load visualizations with lists', () => {

        this.store.state.visualizations = ['v1', 'v2'];
        store.actions.loadVisualisations(this.actionArgs);
        expect(this.actionArgs.commit.callCount).to.be.eq(1);
        expect(this.actionArgs.commit.args[0]).to.be.deep.eq([
          'selectVisualization',
          { visualization: shader1 }
        ]);

      });

      it('Should load visualizations with selected', () => {

        this.store.state.selectedVisualization = ['selectedVisualization'];
        store.actions.loadVisualisations(this.actionArgs);
        expect(this.actionArgs.commit.callCount).to.be.eq(1);
        expect(this.actionArgs.commit.args[0]).to.be.deep.eq([
          'setVisualisations',
          { visualizations: [ shader1 ]}
        ]);

      });

    });

    it('Should create shader engine', () => {

      store.actions.createShaderEngine(this.actionArgs, { container: 'container' });
      expect(this.actionArgs.commit.calledOnce).to.be.true;
      expect(this.actionArgs.commit.calledWith(
        'createShaderEngine',
        { container: 'container' })
      ).to.be.true;

    });

    it('Should stop shader engine', () => {

      this.store.state.shaderEngine = 'shaderEngine';

      store.actions.stopShaderEngine(this.actionArgs);
      expect(this.actionArgs.commit.calledOnce).to.be.true;
      expect(this.actionArgs.commit.calledWith('stopShaderEngine') ).to.be.true;

    });

    it('Should not stop shader engine if not exist', () => {

      store.actions.stopShaderEngine(this.actionArgs);
      expect(this.actionArgs.commit.callCount).to.be.eq(0);

    });

    it('Should set midi value', () => {

      this.store.state.shaderEngine = 'shaderEngine';

      store.actions.setMidiValue(this.actionArgs, { entry: 'entry', value: 'value' });
      expect(this.actionArgs.commit.calledOnce).to.be.true;
      expect(this.actionArgs.commit.calledWith(
        'setMidiValue',
        { entry: 'entry',  value: 'value' }
        ) ).to.be.true;

    });

    it('Should not set midi value if shader engine not exist', () => {

      store.actions.stopShaderEngine(this.actionArgs);
      expect(this.actionArgs.commit.callCount).to.be.eq(0);

    });

  });

  describe('Getters', () => {

    it('Should get selected visualization', () => {

      expect(this.store.getters.selectedVisualization).to.be.eq(null);
      this.store.state.selectedVisualization = 'selectedVisualization';
      expect(this.store.getters.selectedVisualization).to.be.eq('selectedVisualization');

    });

    it('Should get visualizations', () => {

      expect(this.store.getters.visualizations).to.be.deep.eq([]);
      this.store.state.visualizations = ['v1', 'v2'];
      expect(this.store.getters.visualizations).to.be.deep.eq(['v1', 'v2']);

    });

    it('Should get shaderEngine', () => {

      expect(this.store.getters.shaderEngine).to.be.eq(null);
      this.store.state.shaderEngine = 'shaderEngine';
      expect(this.store.getters.shaderEngine).to.be.eq('shaderEngine');

    });

    it('Should get midiHardwareConnected', () => {

      expect(this.store.getters.midiHardwareConnected).to.be.false;
      this.store.state.midiHardwareConnected = true;
      expect(this.store.getters.midiHardwareConnected).to.be.true;

    });

  });

});
