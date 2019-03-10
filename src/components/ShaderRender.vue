<template>
  <div
    id="shader-renderer"
  />
</template>

<style scoped>
  #shader-renderer {
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

      const container = document.getElementById('shader-renderer');
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
        'listenMidiActions',
        'unlistenMidiActions',
      ]),
    }
  }
</script>
