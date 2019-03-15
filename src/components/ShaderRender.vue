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

  import NoSleep from 'nosleep.js';
  import { mapActions } from 'vuex';

  const noSleep = new NoSleep();

  export default {
    name: 'ShaderRender',
    data: () => ({
      listener: null,
    }),
    mounted: async function() {

      const container = document.getElementById('shader-renderer');
      this.createShaderEngine({ container });

      this.listener = (e) => {
        e.preventDefault();

        switch(e.code) {
          case 'Space': {
            this.pauseShader();
            break;
          }
          case 'KeyF': {
            this.switchFullscreen();
            break;
          }
          case 'KeyG': {
            this.goToGallery();
            break;
          }
        }

        return false;
      };
      window.addEventListener("keypress", this.listener);

      document.addEventListener('fullscreenchange', function fullScreenChange(){

        document.removeEventListener('click', fullScreenChange, false);
        noSleep.enable();

      }, false);

      await this.initMidi();
      await this.initLink();

      this.listenMidiActions();
      this.listenLinkActions();

    },
    beforeDestroy: function() {

      window.removeEventListener("keypress", this.listener);

      this.stopShaderEngine();
      this.unlistenMidiActions();
      this.unlistenLinkActions();
      noSleep.disable();

    },
    methods: {
      ...mapActions([
        'createShaderEngine',
        'stopShaderEngine',
        'switchFullscreen',
        'goToGallery',
        'initMidi',
        'initLink',
        'listenMidiActions',
        'unlistenMidiActions',
        'listenLinkActions',
        'unlistenLinkActions',
        'pauseShader',
      ]),
    }
  }
</script>
