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
  q-card.q-ma-sm.flex.flex-column(style="width: 400px" v-if="link")
    //q-card-section(style="word-break: break-word; overflow-y:hidden")
    q-img.link-image(:src="link.ogImage" v-if="link.ogImage" fit="cover" spinner-color="primary")
      div.absolute-bottom.text-subtitle1.text-center.flex.justify-between
        span {{ link.title }}
      div.absolute-top.text-right
        user-card(:user="link.user")
    q-card-section
      a(:href="link.url" target="_blank" rel="noopener noreferrer") {{link.url}}
      div.text-red.ellipsis-2-lines {{ link.ogDescription || link.description }}


    q-card-actions(align="around")
      q-btn(icon="mdi-map-search" v-if="link.coordinates?.length" size="sm" :to="{path:'/links-map', query:{id:item.id}}")
      q-btn(icon="mdi-map" size="sm" @click="linkToMap=link;linkToMapDialog=true" v-if="user?.id === link.user.id")
      q-dialog(max-width="600px" v-model="linkToMapDialog" )
        q-card(style="height:60vh; width:50vh")
          q-toolbar
            q-toolbar-title {{$t('Link to map')}}
            q-btn(icon="mdi-close" @click="linkToMapDialog=false")
          q-card-section
            div {{ linkToMap.title }}
            link-for-map(:link="linkToMap" v-model="clickPoint")
          q-card-actions
            q-btn(@click="setPoint" v-if="clickPoint" color="primary" size="sm" ) Set location

      button-confirm(icon="mdi-delete" color="red" message="Delete link" :route="`/link-remove?id=${link.id}`" :action="refresh" v-if="user?.id === link.user.id" )
      q-btn(:icon="link.hidden?'mdi-eye-off':'mdi-eye'" @click="changeHidden" label="Hidden" v-if="user?.id === link.user.id" :title="$t(link.hidden?'Show':'Hide')" size="sm")

</template>

<style scoped lang="sass">
.link-image
  height: 300px
</style>