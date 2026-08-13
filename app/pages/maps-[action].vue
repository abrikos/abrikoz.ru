<script setup lang="ts">
const zoom = ref(6)
const clickPoint = ref()
const {data:allLinks} = await useFetch('/api/link-list')

</script>

<template lang="pug">
  div#map(style="height:100vh; width:100vw" ref="mapContainer")
    LMap(
      ref="mapRef"
      :zoom="zoom"
      :center="[47.21322, -1.559482]"
      :use-global-leaflet="false"
      @click="click"
      @contextmenu="click")
      LMarker(v-for="link in allLinks" :lat-lng="link.coordinates")
        LIcon( :icon-size="[50, 50]" :icon-url="link.ogImage")
      LTileLayer(
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap")

</template>

<style scoped lang="sass">

</style>