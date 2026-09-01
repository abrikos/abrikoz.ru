<script setup lang="ts">
const zoom = ref(6)
const mapRef = ref()
const route = useRoute()
const {data} = await useFetch('/api/link-list')
const defaultCenter = [47.21322, -1.559482]
const centerLink = computed(()=>{
  return allLinks.value?.find(l=>l.id === route.query.id) || allLinks.value.find(s=>s.coordinates && s.coordinates.length > 0)

})

const allLinks = computed(()=>{
  return data.value.filter(l => l.coordinates && l.coordinates.length > 0)
})

const center = ref(centerLink.value?.coordinates || defaultCenter)

function setMapCenter(){
  const map = mapRef.value.leafletObject
  console.log(map)
  map.setView(centerLink.value?.coordinates || defaultCenter, zoom.value)
}
console.log(center.value)
</script>

<template lang="pug">
  div#map(style="height:50vh; width:50vw" ref="mapContainer")
    LMap(
      ref="mapRef"
      :zoom="zoom"
      :center="center"
      :use-global-leaflet="false"
      )
      LControl(position="topright")
        q-btn(@click="setMapCenter" color="primary" ) Center
      LMarker(v-for="link in allLinks" :lat-lng="link.coordinates")
        LIcon( :icon-size="[50, 50]" :icon-url="link.ogImage")
      LTileLayer(
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap")
  div {{center}}
</template>

<style scoped lang="sass">

</style>