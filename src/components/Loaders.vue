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
      <span
        v-if="linkConnected || linkEnabled || numPeers !== 0"
        class="num-peers"
      >{{ numPeers }}</span>
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
        'numPeers',
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

  .num-peers {
    margin-right: 8px;
  }

</style>
