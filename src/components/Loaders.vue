<template>
  <v-container
    justify-end
    fill-height
    align-center
  >
    <v-btn
      small
      :disabled="!linkConnected"
      :class="linkEnabled ? 'success--text' : ''"
      @click="switchLinkEnable(!linkEnabled)"
    >
      LINK
    </v-btn>
    <v-btn
      icon
    >
      <v-icon
        :class="midiHardwareConnected ? 'success--text' : ''"
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
