<template>
  <div id="midi-loader">
    <div v-if="midiHardwareConnected">
      isConnected
    </div>
    <div v-if="!midiHardwareConnected">
      isDisconnected
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';
  import Midi from '@/modules/helpers/midi';

  export default {
    name: 'MidiLoader',
    computed: {
      ...mapGetters([
        'midiHardwareConnected',
      ]),
    },
    mounted: async function () {

      if(!Midi.isSupported() ){

        throw new Error('WebMIDI is not supported in this browser.')

      }

      if(this.midiHardwareConnected){

        return true;

      }

      await Midi.requestAccess();

      if(!Midi.isListening){

        Midi.listenStatus(this.setMidiHardwareStatus);

      }

    },
    methods: {
      ...mapActions([
        'setMidiHardwareStatus',
      ])
    }

  }

</script>
