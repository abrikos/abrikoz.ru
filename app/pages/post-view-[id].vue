<script setup lang="ts">
const route = useRoute()
const post = ref()
async function load(){
  post.value = await useNuxtApp().$GET(`/post?id=${route.params.id}`)
}
onMounted(load)

useHead({
  title: ()=>post.value?.title,
  meta: [
    {name: 'description', content: ()=>post.value?.short},
    {property: 'og:title', content: ()=>post.value?.title},
    {property: 'og:image', content: ()=>post.value?.poster},
    {property: 'og:type', content: 'article'},
    {property: 'og:description', content: ()=>post.value?.short},
  ]
})
</script>

<template lang="pug">
  post-view(:post="post" v-if="post")
</template>

<style scoped lang="sass">
img
  max-width: 300px
  max-height: 300px
//img.poster
//  float: right
video
  border: 1px solid red
  width: 300px
  height: 300px
</style>
