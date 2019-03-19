<template>
  <v-layout
    row
    wrap
  >
    <v-flex xs3>
      <v-container
        justify-start
        fill-height
        align-center
      >
        <v-btn
          v-if="$route.name === 'shader'"
          to="/"
          color="info"
        >
          <v-icon
            left
            dark
          >
            apps
          </v-icon>
          Gallery
        </v-btn>
      </v-container>
    </v-flex>
    <v-flex xs6>
      <v-container
        justify-center
        fill-height
        align-center
      >
        <v-btn
          :to="$route.name === 'about' ? '/' : '/about'"
          class="app-name"
          flat
        >
          LittleShaderDimension
        </v-btn>
      </v-container>
    </v-flex>
    <v-flex xs3>
      <Loaders />
    </v-flex>
  </v-layout>
</template>

<style scoped>
  .app-name {
    font-size: 1.8rem;
    font-weight: 500;
    margin-top: 15px;
    cursor: default;
  }
</style>

<script>

  import Loaders from '@/components/Loaders.vue';

  export default {
    name: 'Gallery',
    components: {
      Loaders: Loaders
    },
  }

</script>
