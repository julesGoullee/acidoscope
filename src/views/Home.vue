<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <MidiLoader />
  </div>
</template>

<script>

  import MidiLoader from '@/components/MidiLoader.vue'

  export default {
    name: 'Home',
    components: {
      MidiLoader
    }
  }

</script>
