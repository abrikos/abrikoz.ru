<script setup lang="ts">
const {loggedIn} = useUserSession()
const allLinks = ref()//, refresh:refreshAll} = await useFetch('/api/link-list')
const myLinks = ref()//, refresh:refreshMy} = await useFetch('/api/link-my')
const route = useRoute()

async function load(){
  allLinks.value = await useNuxtApp().$GET('/link-list')
  myLinks.value = await useNuxtApp().$GET('/link-my')
}
onMounted(load)

</script>

<template lang="pug">
  div(v-if="route.params.action == 'map'")
    link-map

  div.d-flex.flex-wrap.ga-3(v-if="route.params.action == 'my'")
    link-card(v-for="link in myLinks" :item="link" :refresh="load")

  div.d-flex.flex-wrap.ga-3(v-if="route.params.action == 'all'")
    link-card(v-for="link in allLinks" :item="link" :refresh="load")

  div(v-if="route.params.action == 'add' && loggedIn")
    link-form
</template>

<style scoped lang="sass">

</style>