<template>
  <div id="midi-loader">
    <v-icon
      :color="midiHardwareConnected ? 'rgba(46, 195, 22, 1)' : 'rgba(0, 0, 0, 0.5)'"
      size="30"
    >
      developer_board
    </v-icon>
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

  };

</script>
<style scoped>
  #midi-loader {
    position: absolute;
    top: 10px;
    left: 10px;
  }
</style>
