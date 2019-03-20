<template>
  <v-container
    id="gallery-view"
    style="padding-top: 0!important;"
    :style="[$vuetify.breakpoint.xsOnly ? { 'padding': '0!important' } : '']"
  >
    <Gallery />
  </v-container>
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
