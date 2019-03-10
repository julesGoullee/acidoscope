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
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'MidiLoader',
    computed: {
      ...mapGetters([
        'midiHardwareConnected',
      ]),
    },
    mounted: async function () {

      await this.initMidi();

    },
    methods: {
      ...mapActions([
        'initMidi',
      ])
    }

  };

</script>
<style scoped>
  #midi-loader {}
</style>
