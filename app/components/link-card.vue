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
  v-card.ma-sm.d-flex.flex-column(style="width: 400px; height:400px" v-if="link" :image="link.ogImage")
    v-card-text(style="word-break: break-word; overflow-y:hidden")
      //v-img(:src="link.ogImage" v-if="link.ogImage")
      //v-skeleton-loader(v-else type="card")
      div {{ link.title }}
      a(:href="link.url" target="_blank" rel="noopener noreferrer") {{link.url}}
      div.text-red {{ link.ogDescription || link.description }}


    v-card-actions.d-flex.justify-space-between.items-center
      v-btn(icon="mdi-map-search" v-if="link.coordinates?.length" size="sm" :to="{path:'/links-map', query:{id:item.id}}")
      v-spacer
      v-dialog(max-width="600px")
        template(v-slot:activator="{props}")
          v-btn(icon="mdi-map" size="sm" @click="linkToMap=link;linkToMapDialog=true" v-if="user?.id === link.user" v-bind="props")
        v-card(style="height:60vh; width:50vh")
          v-toolbar
            v-toolbar-title {{$t('Link to map')}}
            v-btn(icon="mdi-close" @click="linkToMapDialog=false")
          v-card-text
            div {{ linkToMap.title }}
            link-for-map(:link="linkToMap" v-model="clickPoint")
          v-card-actions
            v-btn(@click="setPoint" v-if="clickPoint" color="primary" variant="outlined" ) Set location
            v-btn(icon="mdi-delete" @click="clickPoint=null;setPoint()" v-if="link.coordinates?.length")

      button-confirm(icon="mdi-delete" color="red" message="Delete link" :route="`/link-remove?id=${link.id}`" :action="refresh" v-if="user?.id === link.user" )
      v-btn(:icon="link.hidden?'mdi-eye-off':'mdi-eye'" @click="changeHidden" label="Hidden" v-if="user?.id === link.user" :title="$t(link.hidden?'Show':'Hide')")

</template>

<style scoped lang="sass">

</style>