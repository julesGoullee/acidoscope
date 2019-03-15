<template>
  <v-container
    v-if="selectedVisualization"
    class="shader-view"
  >
    <v-flex
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
            @click="switchFullscreen"
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

  import assert from 'assert';

  import ShaderRender from '@/components/ShaderRender.vue'
  import ShaderParams from '@/components/ShaderParams.vue';
  import { mapState, mapActions, mapGetters } from 'vuex';

  export default {
    name: 'ShaderView',
    components: {
      ShaderParams,
      ShaderRender,
    },
    computed: {
      ...mapGetters([
        'shaderRunning',
        'selectedVisualization',
      ]),
      ...mapState([
        'route',
      ]),
    },
    mounted() {

      assert(this.route.params && this.route.params.id, 'invalid_route');

      const shaderId = this.route.params.id;

      this.loadVisualisations();
      this.setVisualisation(shaderId);

    },
    methods: {
      ...mapActions([
        'switchFullscreen',
        'pauseShader',
        'loadVisualisations',
        'setVisualisation',
      ]),
    }
  }
</script>
