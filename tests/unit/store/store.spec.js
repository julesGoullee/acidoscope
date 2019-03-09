import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { cloneDeep } from 'lodash';

import { store } from '@/store';
import shader1 from '@/shaders/shader1'

describe('Store', function () {

  beforeEach( () => {

    this.sandbox = createSandbox();
    this.store = new Vuex.Store(cloneDeep(store) );
    this.localVue = createLocalVue();
    this.localVue.use(Vuex);

  });

  afterEach( () => {

    this.sandbox.restore();

  });

  describe('State', () => {

    it('Should get state', () => {

      expect(this.store.state.selectedVisualization).to.be.eq(null);
      expect(this.store.state.visualizations).to.be.deep.eq([]);

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

  });

  describe('Actions', () => {

    beforeEach( () => {

      this.sandbox = createSandbox();
      this.actionArgs = {
        state: this.store.state,
        commit: this.sandbox.stub(),
        dispatch: this.sandbox.stub()
      };

    });

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

    it('Should do nothing if visualisations set and selected sed', () => {

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

  });

});
