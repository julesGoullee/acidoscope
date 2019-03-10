<template>
  <v-btn
    flat
    icon
    depressed
  >
    <v-icon
      id="midi-loader"
      :color="midiHardwareConnected ? 'rgba(46, 195, 22, 1)' : 'rgba(0, 0, 0, 0.5)'"
      size="30"
    >
      developer_board
    </v-icon>
  </v-btn>
</template>

<script>
  import assert from 'assert';
  import { mapGetters, mapActions } from 'vuex';
  import Midi from '@/modules/midi';

  export default {
    name: 'MidiLoader',
    computed: {
      ...mapGetters([
        'midiHardwareConnected',
      ]),
    },
    mounted: async function () {

      assert(Midi.isSupported(), 'web_midi_not_supported');

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

  };

</script>
<style scoped>
  #midi-loader {}
</style>
