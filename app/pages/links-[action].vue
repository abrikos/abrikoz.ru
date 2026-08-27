<script setup lang="ts">
import {useLoaderStore} from "~/stores/loader.ts";

const {loggedIn} = useUserSession()
const {loading} = storeToRefs(useLoaderStore())
const {data:allLinks, refresh:refreshAll} = await useFetch('/api/link-list')
const {data:myLinks, refresh:refreshMy} = await useFetch('/api/link-my')
const route = useRoute()
const router = useRouter()
const newLink = ref({url: '', hidden: false})
const linkModel = ref()

async function addLink() {
  linkModel.value = await useNuxtApp().$POST(`/link-add`, newLink.value)
  linkModel.value && router.push(`/links-all`)
}

function refreshTotal(){
  refreshAll()
  refreshMy()
}

async function testLink() {
  if (!isValidUrl(newLink.value.url)) return
  linkModel.value = await useNuxtApp().$POST(`/links-test-url`, newLink.value)

}

const isValidUrl = (val: string) => {
  try {
    new URL(val);
    return true;
  } catch (_) {
    return false;
  }
}

const tab =ref()

</script>

<template lang="pug">
  div.d-flex.flex-row
    v-tabs(v-model="tab" direction="vertical" )
      v-tab(to="/links-all" @click="refreshTotal" value="all" :text="$t('All')")
      v-tab(to="/links-my" @click="refreshTotal"  value="my" v-if="loggedIn" :text="$t('My')")
      v-tab(to="/links-map" value="map" :text="$t('Map')") {{$t('Map')}}
      v-tab(to="/links-add" value="add" v-if="loggedIn" :text="$t('Add')")


    v-tabs-window(v-model="tab")
      v-tabs-window-item(value="map" )
        link-map

      v-tabs-window-item(value="my").d-flex.justify-space-between.flex-wrap.ga-3
        link-card(v-for="link in myLinks" :item="link" :refresh="refreshMy")

      v-tabs-window-item(value="all").d-flex.justify-space-between.flex-wrap.ga-3
        link-card(v-for="link in allLinks" :item="link" :refresh="refreshAll")

      v-tabs-window-item(value="add")(v-if="loggedIn")
        v-form(@submit.prevent="addLink")
          v-text-field(hint="http / https" v-model="newLink.url" :label="$t('Link')" :rules="[val => !!val || $t('Link is required'), val => isValidUrl(val) || $t('Please enter a valid link')]" @update:model-value="testLink")
          v-checkbox(v-model="newLink.hidden" :label="$t('Hide link for others')" )
          div
            v-btn(type="submit" color="primary" :loading="loading") {{$t('Create')}}
            v-btn(@click="testLink" :loading="loading") Test
        link-card(v-if="linkModel" v-model="linkModel" :refresh="refreshTotal")
</template>

<style scoped lang="sass">

</style>