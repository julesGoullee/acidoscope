import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import { waitNextTick } from '@/../tests/unit/test.utils';
import MidiLoader from '@/components/Loaders.vue';
import Midi from '@/modules/midi';

describe('Components: Loaders', function (){

  beforeEach(() => {

    this.sandbox = createSandbox();
    this.localVue = createLocalVue();
    this.localVue.use(Vuex);

    this.stubs = {
      getters: {
        midiHardwareConnected: this.sandbox.stub(),
      },
      actions: {
        setMidiHardwareStatus: this.sandbox.stub(),
      }
    };
    this.store = new Vuex.Store({
      getters: {
        midiHardwareConnected: this.stubs.getters.midiHardwareConnected,
      },
      actions: {
        setMidiHardwareStatus: this.stubs.actions.setMidiHardwareStatus,
      }
    });

    this.shallowConfig = { store: this.store,  localVue: this.localVue};
    this.stubMidiIsSupported = this.sandbox.stub(Midi, 'isSupported').returns(true);
    this.stubMidiRequestAccess = this.sandbox.stub(Midi, 'requestAccess').resolves();
    this.stubMidiListenStatus = this.sandbox.stub(Midi, 'listenStatus');

  });

  afterEach(() => {

    Midi.isListening = false;
    this.sandbox.restore();

  });

  describe('Mount', () => {

    it('Should request access and listen on mount', async () => {

      const wrapper = shallowMount(MidiLoader, this.shallowConfig);
      await waitNextTick(wrapper);
      await waitNextTick(wrapper);

      expect(wrapper.contains('#midi-loader') ).to.be.true;
      expect(this.stubMidiRequestAccess.calledOnce).to.be.true;
      expect(this.stubMidiListenStatus.calledOnce).to.be.true;

    });

    it('Should not request access and listen if is connected on mount', async () => {

      this.stubs.getters.midiHardwareConnected.returns(true);
      const wrapper = shallowMount(MidiLoader, this.shallowConfig);
      await waitNextTick(wrapper);

      expect(wrapper.contains('#midi-loader') ).to.be.true;
      expect(this.stubMidiRequestAccess.calledOnce).to.be.false;
      expect(this.stubMidiListenStatus.calledOnce).to.be.false;

    });

    it('Should not listen if is already listenning', async () => {

      Midi.isListening = true;

      const wrapper = shallowMount(MidiLoader, this.shallowConfig);
      await waitNextTick(wrapper);

      expect(wrapper.contains('#midi-loader') ).to.be.true;
      expect(this.stubMidiRequestAccess.calledOnce).to.be.true;
      expect(this.stubMidiListenStatus.calledOnce).to.be.false;

    });

  });

});
