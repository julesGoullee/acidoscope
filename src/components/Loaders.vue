<template>
  <v-container
    justify-end
    fill-height
    align-center
  >
    <v-btn
      flat
      small
      :color="linkConnected ? 'rgba(46, 195, 22, 1)' : 'rgba(0, 0, 0, 0.5)'"
    >
      LINK
    </v-btn>
    <v-btn
      flat
      icon
    >
      <v-icon
        :color="midiHardwareConnected ? 'rgba(46, 195, 22, 1)' : 'rgba(0, 0, 0, 0.5)'"
      >
        developer_board
      </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Loaders',
    computed: {
      ...mapGetters([
        'midiHardwareConnected',
        'linkEnable',
        'linkConnected',
      ]),
    }

  };

</script>

<style scoped>
</style>
