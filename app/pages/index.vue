<script setup lang="ts">
function  setHeaders() {
  useHead({
    title: "Abrikos HP",
    meta: [
      {name: 'description', content: "Home page of Abrikos"},
      {property: 'og:title', content: "Home page of Abrikos"},
      {property: 'og:image', content: 'https://abrikoz.ru/logo.svg'},
      // {property: 'og:type', content: 'article'},
      // {property: 'og:description', content: post.value.short},
    ],
    bodyAttrs: {
      class: 'test',
    },
    script: [{innerHTML: 'console.log(\'Hello world\')'}],
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