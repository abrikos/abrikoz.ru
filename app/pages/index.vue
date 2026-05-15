<script setup lang="ts">
function  setHeaders() {
  useHead({
    title: "post.value.title",
    meta: [
      {name: 'description', content: "post.value.short"},
      {property: 'og:title', content: "post.value.title"},
      {property: 'og:image', content: 'https://lh3.googleusercontent.com/a/ACg8ocJLK0U7VDBxmEgkvaKvWF8c3Y7i7itnMf33M1jAXVIYZg-B6b4K=s96-c'},
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
div GOGOG {{data}}
</template>

<style scoped lang="sass">

</style>