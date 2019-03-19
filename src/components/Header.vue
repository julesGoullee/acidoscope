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
          color="#d6a8f3"
          to="/"
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
    color: #706a73;
    margin-top: 15px;
    cursor: default;
    text-transform: none;
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
