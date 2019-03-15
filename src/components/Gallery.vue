<template>
  <v-layout
    class="gallery-container"
    justify-center
  >
    <v-flex
      xs12
    >
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              v-for="visualization in visualizations"
              :key="visualization.id"
              xs3
            >
              <v-card
                :to="`/shader/${visualization.id}`"
                hover
              >
                <v-img
                  :src="getShaderScreenshots(visualization.id)"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex
                        xs12
                        align-end
                        flexbox
                      >
                        <span
                          class="headline white--text"
                          v-text="visualization.name || ''"
                        />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style scoped>
  .gallery-container {
    margin-top: 50px;
  }
</style>

<script>

  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Gallery',
    computed: {
      ...mapGetters([
        'visualizations',
      ])
    },
    mounted: async function () {

      if(this.visualizations.length === 0){

        await this.loadVisualisations();

      }

    },
    methods: {
      ...mapActions([
        'loadVisualisations'
      ]),
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
