<script setup lang="ts">
function  setHeaders() {
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
}
setHeaders()

const { data } = await useFetch('/api/blog/all')


</script>

<template lang="pug">
div INDEX
</template>

<style scoped lang="sass">

</style>