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
    data: () => ({
      listener: null,
    }),
    mounted: async function() {

      const container = document.getElementById('shader-renderer');
      this.createShaderEngine({ container });
      await this.listenMidiActions();
      await this.listenLinkActions();

      this.listener = (e) => {
        e.preventDefault();
        if(e.code === 'Space') {
          this.pauseShader();
        }
        return false;
      };
      window.addEventListener("keypress", this.listener);

    },
    beforeDestroy: function() {

      this.stopShaderEngine();
      this.unlistenMidiActions();
      this.unlistenLinkActions();
      window.window.removeEventListener("keypress", this.listener);

    },
    methods: {
      ...mapActions([
        'createShaderEngine',
        'stopShaderEngine',
        'listenMidiActions',
        'unlistenMidiActions',
        'listenLinkActions',
        'unlistenLinkActions',
        'pauseShader',
      ]),
    }
  }
</script>
