<script setup lang="ts">
const mapRef = ref()
const zoom = ref(6)
const clickPoint = defineModel()
const {link} = defineProps<{ link: object }>()

function click(e) {
  clickPoint.value = e
}
</script>

<template lang="pug">
  div.map(ref="mapContainer")
    LMap(
      ref="mapRef"
      :zoom="zoom"
      :center="link.coordinates.length ? link.coordinates : [47.21322, -1.559482]"
      :use-global-leaflet="false"
      @click="click"
      @contextmenu="click")
      LMarker(v-if="clickPoint" :lat-lng="clickPoint.latlng" ref="clickMarker")

      LMarker(v-if="link.coordinates.length" :lat-lng="link.coordinates")
        LIcon( :icon-size="[50, 50]" :icon-url="link.ogImage")

      LTileLayer(
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap")

</template>

<style scoped lang="sass">
.map
  border: 1px solid green
  width: 100%
  height: 40vh
</style>