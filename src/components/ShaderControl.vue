<template>
  <v-container>
    <v-layout
      row
      wrap
      justify-center
    >
      <v-flex xs3>
        <v-btn
          raised
          block
          color="accent"
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
      <v-flex xs3>
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
      <v-flex xs3>
        <v-btn
          raised
          block
          @click="takeScreenShot"
        >
          Save
          <v-icon
            right
            dark
          >
            camera_alt
          </v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs3>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              color="secondary"
              block
              dark
              v-on="on"
            >
              {{
              (qualities.find(q => q.value === quality) || {name: 'Custom quality'}).name
              }}
            </v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in qualities"
              :key="index"
              @click="() => setQuality(item.value)"
            >
              <v-list-tile-title>
                <v-layout align-content-space-between>
                  <v-flex>
                    {{ item.name }}
                  </v-flex>
                  <v-flex shrink>
                    <v-icon
                      v-if="quality === item.value"
                      color="success"
                    >
                      check_circle
                    </v-icon>
                  </v-flex>
                </v-layout>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
</style>

<script>

  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'ShaderControl',
    computed: {
      ...mapGetters([
        'shaderRunning',
        'quality',
      ]),
    },
    methods: {
      ...mapActions([
        'switchFullscreen',
        'pauseShader',
        'takeScreenShot',
        'setQuality',
      ]),
    },
    data: () => ({
      qualities: [
        {
          name: 'Normal quality',
          value: 1,
        },
        {
          name: 'Low quality',
          value: 0.6,
        },
        {
          name: 'Very low quality',
          value: 0.4,
        },
        {
          name: 'Very high quality',
          value: 2,
        },
        {
          name: 'Dope',
          value: 4,
        },
      ],
    }),
  }
</script>
