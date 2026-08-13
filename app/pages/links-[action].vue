<script setup lang="ts">
const {loggedIn} = useUserSession()
const loading = ref(false)
const {data:allLinks, refresh:refreshAll} = await useFetch('/api/link-list')
const {data:myLinks, refresh:refreshMy} = await useFetch('/api/link-my')
const route = useRoute()
const newLink = ref({url: 'https://www.youtube.com/watch?v=_Iw7dkteKHw&list=RD_Iw7dkteKHw&start_radio=1', hidden: false})
const linkModel = ref()

async function addLink() {
  loading.value = true
  linkModel.value = await useNuxtApp().$POST(`/link-add`, newLink.value)
  loading.value = false
}

function tabChange(){
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
  q-tabs(active-color="primary" inactive-color="primary" v-model="tab" )
    q-route-tab(to="/links-view" label="View" @click="tabChange" name="view")
    q-route-tab(to="/links-my" label="My" @click="tabChange"  name="my" v-if="loggedIn")
    q-route-tab(to="/links-add" label="Add" name="add" v-if="loggedIn")



  div.flex(v-if="route.params.action == 'my'")
    link-card(v-for="link in myLinks" :item="link" :refresh="refreshMy")

  div.flex(v-if="route.params.action == 'view'")
    link-card(v-for="link in allLinks" :item="link" :refresh="refreshAll")

  div(v-if="route.params.action == 'add' && loggedIn")
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