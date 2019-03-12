<template>
  <v-container
    class="shader-view"
  >
    <v-flex
      id="fullscreen-renderer"
      class="shader-container"
      xs12
    >
      <ShaderRender />
    </v-flex>
    <v-container>
      <v-layout
        row
        wrap
        justify-center
      >
        <v-flex xs6>
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
        <v-flex xs6>
          <v-btn
            raised
            block
            :color="shaderRunning ? 'success' : 'error'"
            @click="pauseShader"
          >
            {{ shaderRunning ? 'Play' : 'Pause' }}
            <v-icon
              right
              dark
            >
              {{ shaderRunning ? 'play_arrow' : 'pause' }}
            </v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <ShaderParams />
  </v-container>
</template>

<style scoped>
  .shader-view{
  }
  .shader-container {
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
