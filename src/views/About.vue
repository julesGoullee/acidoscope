<template>
  <v-container>
    <v-card>
      <v-container class="text-center">

        <h1>About</h1>
        <p>Hey there, good to have you here !</p>

        <h2>Description</h2>
        <p>
          LittleShaderDimension is a web app that allows to display interactive visualisations.
        </p>

        <h2>MIDI</h2>
        <p>
          Animation parameters can be controlled via a MIDI controller. <br/>
          Just plug your device and play with the encoders. Only Ableton Push controls have been mapped yet.<br/>
          Browser may request your permissions to access the hardware.
        </p>

        <h2>Link</h2>
        <p>
          The animations can be synchronized to a tempo set by Link, available in Ableton Live and Traktor. <br/>
          Please refer to the documentation on the repository for further informations.
        </p>

        <h2>Code</h2>
        <p>
          We're Open Source ;)
          <br/>
          <a href="https://github.com/julesgoullee/shaders-midi" target="_blank">https://github.com/julesgoullee/shaders-midi</a>
        </p>

      </v-container>
    </v-card>
  </v-container>
</template>

<style scoped>
  .text-center {
    text-align: center;
  }
</style>

<script>
  export default {
    name: 'AboutView',
  }
</script>
