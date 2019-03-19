<template>
  <v-container tag="section">
    <v-card>
      <v-container>

        <v-layout justify-center>
          <img alt="logo" src="@/assets/logo-192.png" />
        </v-layout>
        <h2 class="headline">Description</h2>

        <v-card-text>
          <b>Acidity</b> is a web app that allows to display interactive visualisations.
        </v-card-text>

        <h2 class="headline">MIDI</h2>
        <v-card-text>
          Animation parameters can be controlled via a MIDI controller. <br/>
          Just plug your device and play with the encoders. Only Ableton Push controls have been mapped yet.<br/>
          Browser may request your permissions to access the hardware.
        </v-card-text>

        <h2 class="headline">Link</h2>
        <v-card-text>
          The animations can be synchronized to a tempo set by Link, available in Ableton Live and Traktor. <br/>
          Please refer to the documentation on the repository for further informations.
        </v-card-text>

        <h2 class="headline">Code</h2>
        <v-card-text>
          We're Open Source ;)
          <br/>
          <a href="https://github.com/julesgoullee/shaders-midi" target="_blank">https://github.com/julesgoullee/shaders-midi</a>
        </v-card-text>
      </v-container>
    </v-card>
  </v-container>
</template>

<style scoped>
</style>

<script>
  export default {
    name: 'AboutView',
  }
</script>
