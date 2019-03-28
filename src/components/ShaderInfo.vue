<template>
  <v-container
    class="shader-info"
    justify-center
  >
    <v-flex
      xs12
      md6
      offset-md3
    >
      <v-card color="purple" class="white--text">
        <v-layout row>
          <v-flex xs12>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{selectedVisualization.name}}</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
          <v-btn
            :href="selectedVisualization.original"
            target="_blank"
          >
            <v-icon
              left
              dark
            >
              open_in_new
            </v-icon>
            Original shader
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-container>
</template>

<style scoped>
  .shader-info{
  }
</style>

<script>

  import { mapGetters } from 'vuex';

  export default {
    name: 'ShaderInfo',
    computed: {
      ...mapGetters([
        'selectedVisualization',
      ]),
    },
    methods: {
      getShaderScreenshots(id) {

        try {
          return require(`@/assets/shaderScreenshots/${id}.jpg`);
        } catch(e) {
          return require(`@/assets/shaderScreenshots/default.jpg`);
        }

      }
    }
  }
</script>
