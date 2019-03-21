<template>
  <v-layout
    row
    wrap
    justify-center
  >
    <v-flex sm2 md3 xs12 align-self-center order-xs2 order-sm1 order-md1>
      <v-container justify-center class="no-padding-xs" v-if="$route.name === 'shader'">
        <v-btn
          to="/"
          color="info"
          block
        >
          <v-icon
            dark
          >
            apps
          </v-icon>
        </v-btn>
      </v-container>
    </v-flex>
    <v-flex sm8 md6 xs12 order-xs1 order-sm2 order-md2>
      <v-container text-xs-center text-md-center
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
    <v-flex sm2 order-sm3 class="hidden-md-and-up hidden-xs-only">
    </v-flex>
    <v-flex md3 order-md3 class="hidden-sm-and-down">
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
  @media only screen and (max-width: 600px) {
    .no-padding-xs {
      padding: 0;
    }
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
