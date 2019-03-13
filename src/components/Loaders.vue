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
    <v-icon
      id="link-loader"
      :color="linkConnected ? 'rgba(46, 195, 22, 1)' : 'rgba(0, 0, 0, 0.5)'"
      size="30"
    >
      developer_board
    </v-icon>
  </v-btn>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Loaders',
    computed: {
      ...mapGetters([
        'midiHardwareConnected',
        'linkEnable',
        'linkConnected',
      ]),
    },
    mounted: async function () {

      await this.initMidi();
      await this.initLink();

    },
    methods: {
      ...mapActions([
        'initMidi',
        'initLink',
      ])
    }

  };

</script>
<style scoped>
  #midi-loader {}
</style>
