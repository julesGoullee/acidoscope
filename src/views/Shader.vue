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
          color="success"
          @click="fullscreen"
        >
          VR
          <v-icon
            right
            dark
          >
            headset
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
  import { mapActions } from 'vuex';

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
      ...mapActions(['loadVisualisations']),
      fullscreen: function () {

        const el = document.getElementById('fullscreen-renderer');
        if(el.requestFullscreen) {
          el.requestFullscreen();
        }

      },
    }
  }
</script>
