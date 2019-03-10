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
  import { VIcon } from 'vuetify/lib'
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'MidiLoader',
    components: {
      VIcon
    },
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
  #midi-loader {
    position: absolute;
    top: 10px;
    left: 10px;
  }
</style>
