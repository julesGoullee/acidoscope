<template>
  <v-layout
    row
    wrap
  >
    <v-flex xs12 sm6 md3 v-if="$route.name === 'shader'">
      <v-container
        :style="[$vuetify.breakpoint.smAndDown ? { 'padding': '5px!important' } : '']"
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
    <v-flex xs12 sm4 md6 :offset-sm4="$route.name !== 'shader'" :offset-md3="$route.name !== 'shader'">
      <v-container
        :style="[$vuetify.breakpoint.smAndDown ? { 'padding': '0!important' } : '']"
        text-xs-center
      >
        <v-btn
          :to="$route.name === 'about' ? '/' : '/about'"
          class="app-name"
          flat
        >
          <img
            alt="logo"
            src="@/assets/logo-32.png"
            class="title-logo"
          >
          Acidity
          <img
            alt="logo"
            src="@/assets/logo-32.png"
            class="title-logo flip"
          >
        </v-btn>
      </v-container>
    </v-flex>
    <v-flex xs3 class="hidden-sm-and-down">
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
    /* font-family: 'Jura', sans-serif; */
    font-family: 'Poiret One', cursive;
    /* font-family: 'Orbitron', sans-serif; */
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
