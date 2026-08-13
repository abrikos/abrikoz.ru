<script setup lang="ts">

const loading = ref(false)
const {data, refresh} = await useFetch('/api/links-list')
const route = useRoute()
const newLink = ref({url: 'https://www.youtube.com/watch?v=_Iw7dkteKHw&list=RD_Iw7dkteKHw&start_radio=1', hidden: false})
const linkModel = ref()

async function addLink() {
  loading.value = true
  linkModel.value = await useNuxtApp().$POST(`/links-add`, newLink.value)
  loading.value = false
}

function tabChange(){
  refresh()
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
  q-tabs(active-color="primary" inactive-color="primary" v-model="tab" )
    q-route-tab(to="/links-view" label="View" @click="tabChange" name="view")
    q-route-tab(to="/links-add" label="Add" name="add")



  div.flex(v-if="route.params.action == 'view'")
    link-card(v-for="link in data" :item="link")

  div(v-if="route.params.action == 'add'")
    q-form(@submit.prevent="addLink")
      q-input(v-model="newLink.url" label="URL" :rules="[val => !!val || 'URL is required', val => isValidUrl(val) || 'Please enter a valid URL']" @update:model-value="testLink")
      q-toggle(v-model="newLink.hidden" label="Hide link for others" )
      div
        link-card(v-if="linkModel" v-model="linkModel")
        q-btn(type="submit" label="Add link" color="primary" :loading="loading")
        q-btn(label="Test" @click="testLink" :loading="loading")

</template>

<style scoped lang="sass">

</style>