<template>
  <v-app id="app">
    <v-container grid-list-md justify-space-between>
      <v-layout
        row
        wrap
      >
        <v-flex xs4>
          <v-btn
            v-if="$route.name === 'shader'"
            color="#d6a8f3"
            to="/"
          >
            <v-icon left dark>apps</v-icon>
            Gallery
          </v-btn>
        </v-flex>
        <v-flex xs4>
          <v-layout justify-center fill-height align-center>
          <span class="app-name">
            LittleShaderDimension
          </span>
          </v-layout>
        </v-flex>
        <v-flex xs4>
          <v-layout justify-end>
            <MidiLoader />
          </v-layout>
        </v-flex>
      </v-layout>
      <v-container class="view-container">
        <router-view />
      </v-container>
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
  .app-name {
    font-size: 1.8rem;
    font-weight: 500;
    color: #706a73;
    margin-top: 15px;
    cursor: default;
  }
  .view-container{
    padding-top: 50px;
  }
</style>
