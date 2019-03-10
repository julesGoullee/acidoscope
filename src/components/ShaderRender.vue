<script src="../../tests/unit/store/index.spec.js"></script>
<template>
  <div
    id="shader-container"
  />
</template>

<style scoped>
  #shader-container {
    width: 100%;
    height: 100%;
    background-color: black;
  }
</style>

<script>

  import { mapActions } from 'vuex';

  export default {
    name: 'ShaderRender',
    mounted: async function() {

      const container = document.getElementById( 'shader-container');
      this.createShaderEngine({ container });
      await this.listenMidiActions();

    },
    beforeDestroy: function() {

      this.stopShaderEngine();
      this.unlistenMidiActions();

    },
    methods: {
      ...mapActions([
        'createShaderEngine',
        'stopShaderEngine',
        'listenMidi',
        'unlistenMidi',
      ]),
    }
  }
</script>
