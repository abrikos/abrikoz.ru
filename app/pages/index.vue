<script setup lang="ts">
const {data:list, refresh} = await useFetch(`/api/post-list`)
useNuxtApp().hook('posts-load', refresh)

//$listen('posts-load', refresh)
useHead({
  title: "Abrikos HP",
  meta: [
    {name: 'description', content: "Home page of Abrikos site"},
    {property: 'og:title', content: "Home page of Abrikos site"},
    {property: 'og:image', content: 'https://abrikoz.ru/logo.svg'},
    {property: 'og:type', content: 'website'},
    {property: 'og:description', content: 'Home page of my site'},
  ]
})


</script>

<template lang="pug">
  div.flex
    post-card(v-for="post in list" :post="post")
</template>

<style scoped lang="sass">

</style>