<template>
  <v-app id="app">
    <v-container
      grid-list-md
      class="app-container"
    >
      <v-layout
        row
        wrap
      >
        <v-flex xs6>
          <v-btn
            v-if="$route.name === 'shader'"
            flat
            to="/"
          >
            Gallery
          </v-btn>
        </v-flex>
        <v-flex xs5 />
        <v-flex
          xs1
        >
          <MidiLoader />
        </v-flex>
      </v-layout>
      <router-view />
    </v-container>
  </v-app>
</template>
<script>

  import MidiLoader from '@/components/MidiLoader.vue';
  import {
    VApp,
  } from 'vuetify/lib'

  export default {
    name: 'App',
    components: {
      VApp,
      MidiLoader
    }
  };

</script>
<style>
  body {
    margin: 0;
    overflow: hidden;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }
  .app-container{
    width: 100%;
    padding-top: 10px;
  }
</style>
