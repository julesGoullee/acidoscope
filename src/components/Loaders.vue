<template>
  <v-container
    justify-end
    fill-height
    align-center
  >
    <v-btn
      flat
      small
      :disabled="!linkConnected"
      :color="linkEnabled ? 'rgba(46, 195, 22, 1)' : 'rgba(0, 0, 0, 0.5)'"
      @click="switchLinkEnable(!linkEnabled)"
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
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Loaders',
    computed: {
      ...mapGetters([
        'midiHardwareConnected',
        'linkEnabled',
        'linkConnected',
      ]),
    },
    methods: {
      ...mapActions([
        'switchLinkEnable',
      ]),
    }

  };

</script>

<style scoped>
</style>
