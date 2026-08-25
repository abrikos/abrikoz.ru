<script setup lang="ts">
const model = defineModel()
const {item, refresh} = defineProps<{ item?: {id:string, coordinates:[number?, number?]}, refresh?: () => void }>()
const {user} = useUserSession()
const link = computed(() => {
  return model.value || item
})

async function changeHidden() {
  if(!item) return
  await useNuxtApp().$GET('/link-hide?id=' + item.id)
  refresh && refresh()
}

async function setPoint() {
  if(!item) return
  item.coordinates = clickPoint.value ? [clickPoint.value.latlng.lat, clickPoint.value.latlng.lng] : []
  await useNuxtApp().$POST('/link-point', item)
  refresh && refresh()
  clickPoint.value = null
  linkToMap.value = item
  //linkToMapDialog.value = false
}

const linkToMap = ref()
const clickPoint = ref()
const linkToMapDialog = ref(false)

</script>

<template lang="pug">
  q-card.column.no-wrap.q-ma-sm(style="width: 400px; height:400px" v-if="link")
    q-card-section(style="word-break: break-word; overflow-y:scroll")
      q-img(:src="link.ogImage")
      div.text-h6 {{ link.title }}
        q-icon(name="mdi-map" v-if="link.coordinates?.length" color="green" )
      div.text-subtitle2 {{ link.ogDescription || link.description }}
      a(:href="link.url" target="_blank" rel="noopener noreferrer") {{link.url}}

    q-card-actions.q-mt-auto.flex.justify-between
      q-btn(icon="mdi-map-search" v-if="link.coordinates?.length" size="sm" :to="{path:'/links-map', query:{id:item.id}}")
      span(v-if="user?.id === link.user" )
        q-btn(icon="mdi-map" size="sm" @click="linkToMap=link;linkToMapDialog=true")
        button-confirm(icon="mdi-delete" size="sm" color="red" message="Delete link" :route="`/link-remove?id=${link.id}`" :action="refresh")
        q-toggle(v-model="link.hidden" @update:model-value="changeHidden" label="Hidden" size="sm" )

  q-dialog(v-model="linkToMapDialog")
    q-card(style="height:60vh; width:50vh")
      q-toolbar
        q-toolbar-title Add to map "{{ linkToMap.title }}"
      q-card-section
        link-for-map(:link="linkToMap" v-model="clickPoint")
      q-card-actions
        q-btn(label="Set location" size="sm" @click="setPoint" v-if="clickPoint" color="primary" )
        q-btn(icon="mdi-delete" size="sm" @click="clickPoint=null;setPoint()" v-if="link.coordinates?.length")
</template>

<style scoped lang="sass">

</style>