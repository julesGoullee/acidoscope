<template>
  <v-layout id="gallery-view">
    <Gallery />
  </v-layout>
</template>

<script>

  import Gallery from '@/components/Gallery.vue'

  export default {
    name: 'GalleryView',
    components: {
      Gallery
    }
  }

</script>
