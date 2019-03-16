<template>
  <v-container
    justify-end
    fill-height
    align-center
  >
    <v-btn
      small
      :class="linkConnected ? 'success--text' : ''"
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
</style>
