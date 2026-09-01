<script setup lang="ts">

const zoom = ref(8)

function click(e: any) {
  coords.value.push([e.latlng.lat, e.latlng.lng])
}

function markerMove(l: any, i: number) {
  coords.value[i] = l
}

const coords = ref([
  [47.334852, -1.509485],
  [47.342596, -1.328731],
  [47.241487, -1.190568],
  [47.234787, -2.358337],
])
const poly = ref()
if (useNuxtApp().$L) {
  //console.log(useNuxtApp().$L.GeometryUtil.accumulatedLengths([[47.342596, -1.328731],[47.334852, -1.509485]]))
}
onMounted(() => {
  console.log(poly.value)
})
</script>

<template lang="pug">
  div.map(ref="mapContainer")
    LMap(
      ref="mapRef"
      :zoom="zoom"
      :center="[47.334852, -1.509485]"
      :use-global-leaflet="false"
      @contextmenu="click")
      LMarker(v-for="(point, i) in coords" :lat-lng="point" ref="clickMarker" draggable @update:lat-lng="l=>markerMove(l,i)")
      LPolygon(:lat-lngs="coords" :key="Math.random()" ref="poly")
      LTileLayer(
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap")

</template>

<style scoped lang="sass">
.map
  width: 100%
  height: 700px
  background-color: red
  border: 1px solid green
</style>