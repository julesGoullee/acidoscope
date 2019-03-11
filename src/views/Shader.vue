<template>
  <v-layout
    class="shader-view"
    align-center
    justify-start
    column
  >
    <div
      id="fullscreen-renderer"
      class="shader-container"
    >
      <ShaderRender />
    </div>
    <v-layout
      row
      wrap
    >
      <v-flex>
        <v-btn
          raised
          block
          color="info"
          @click="fullscreen"
        >
          Fullscreen
          <v-icon
            right
            dark
          >
            fullscreen
          </v-icon>
        </v-btn>
      </v-flex>
      <v-flex>
        <v-btn
          raised
          block
          color="warning"
          @click="fullscreen"
        >
          VR
          <v-icon
            right
            dark
          >
            toggle_off
          </v-icon>
        </v-btn>
      </v-flex>
      <v-flex>
        <v-btn
          raised
          block
          :color="shaderRunning ? 'error' : 'success'"
          @click="pauseShader"
        >
          {{ shaderRunning ? 'Pause' : 'Play' }}
          <v-icon
            right
            dark
          >
            {{ shaderRunning ? 'pause' : 'play_arrow' }}
          </v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <ShaderParams />
  </v-layout>
</template>

<style scoped>
  .shader-view {
    padding: 50px;
  }
  .shader-container {
    width: 80%;
    height: 400px;
    z-index: 0;
    position: relative;
  }
</style>

<script>

  import NoSleep from 'nosleep.js';
  import ShaderRender from '@/components/ShaderRender.vue'
  import ShaderParams from '@/components/ShaderParams.vue';
  import { mapActions, mapGetters } from 'vuex';

  const noSleep = new NoSleep();

  export default {
    name: 'ShaderView',
    components: {
      ShaderParams,
      ShaderRender,
    },
    data: () => ({
      isFullscreen: false,
    }),
    computed: {
      ...mapGetters([
        'shaderRunning',
      ])
    },
    mounted: async function () {

      document.addEventListener('fullscreenchange', function fullScreenChange(){

        document.removeEventListener('click', fullScreenChange, false);
        noSleep.enable();

        this.isFullscreen = !!document.fullscreenElement;

      }, false);

    },
    beforeDestroy: function() {

      noSleep.disable();

    },
    methods: {
      ...mapActions([
        'loadVisualisations',
        'pauseShader',
      ]),
      fullscreen: function () {

        const el = document.getElementById('fullscreen-renderer');
        if(el.requestFullscreen) {
          el.requestFullscreen();
        }

      },
    }
  }
</script>
