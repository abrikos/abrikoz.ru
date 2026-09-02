<script setup lang="ts">
const {loggedIn} = useUserSession()
const allLinks = ref()//, refresh:refreshAll} = await useFetch('/api/link-list')
const myLinks = ref()//, refresh:refreshMy} = await useFetch('/api/link-my')
const route = useRoute()

async function load(){
  allLinks.value = await useNuxtApp().$GET('/link-list')
  if(loggedIn.value) {
    myLinks.value = await useNuxtApp().$GET('/link-my')
  }
}
onMounted(load)

</script>

<template lang="pug">
  div(v-if="route.params.action == 'map'")
    link-map

  div.flex.flex-wrap(v-if="route.params.action == 'my'")
    link-card(v-for="link in myLinks" :item="link" :refresh="load")

  div.flex.flex-wrap(v-if="route.params.action == 'all'")
    link-card(v-for="link in allLinks" :item="link" :refresh="load")

  div(v-if="route.params.action == 'add' && loggedIn")
    link-form
</template>

<style scoped lang="sass">

</style>