<template>
  <div
    id="shader-renderer"
  >
    <ShaderParams
      v-if="isFullScreen && displayFullScreenControl"
      class="overflow-params"
    />
  </div>
</template>

<style scoped>
  #shader-renderer {
    width: 100%;
    height: 100%;
    background-color: black;
  }
  .overflow-params{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.6;
  }
</style>

<script>

  import NoSleep from 'nosleep.js';
  import { mapGetters, mapActions } from 'vuex';

  import ShaderParams from '@/components/ShaderParams.vue';

  const noSleep = new NoSleep();

  export default {
    name: 'ShaderRender',
    components: {
      ShaderParams,
    },
    computed: {
      ...mapGetters([
        'displayFullScreenControl',
      ]),
    },
    data: function(){
      return {
        isFullScreen: false,
        listenerFullScreen: () => {

          // TODO move nosleep in engine
          if(document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) {

            noSleep.enable();
            this.isFullScreen = true;

          } else {

            this.isFullScreen = false;

          }

        }
      }
    },
    mounted: async function() {

      const container = document.getElementById('shader-renderer');
      this.createShaderEngine({ container });

      document.addEventListener('fullscreenchange', this.listenerFullScreen, false);

      this.listenMidiActions();
      this.listenLinkActions();

    },
    beforeDestroy: function() {

      window.removeEventListener('fullscreenchange', this.listenerFullScreen);

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
        'listenMidiActions',
        'unlistenMidiActions',
        'listenLinkActions',
        'unlistenLinkActions',
        'pauseShader',
        'takeScreenShot',
        'nextVisualisation',
      ]),
    }
  }
</script>
