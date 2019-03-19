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
          <img alt="logo" src="@/assets/logo-32.png" class="title-logo"/>
          Acidity
          <img alt="logo" src="@/assets/logo-32.png" class="title-logo flip"/>
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
    font-size: 3.5rem;
    font-weight: 500;
    cursor: pointer;
    text-transform: none;
  }
  .title-logo {
    margin: 8px;
  }
  .flip {
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
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
