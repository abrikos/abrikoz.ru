<script setup lang="ts">
const route = useRoute()
const {data:post} = await useFetch(`/api/post?id=${route.params.id}`)
useHead({
  title: post.value?.title,
  meta: [
    {name: 'description', content: post.value?.short},
    {property: 'og:title', content: post.value?.title},
    {property: 'og:image', content: post.value?.poster},
    {property: 'og:type', content: 'article'},
    {property: 'og:description', content: post.value?.short},
  ]
})
</script>

<template lang="pug">
  div.q-pa-lg(v-if="post" )
    h1 {{ post.title }}
    div.bg-grey-4.q-pa-sm.flex
      div.q-mx-sm(v-if="post.poster")
        img.poster(:src="post.poster")
      strong {{post.short}}
    mark-down#mark-down(:text="post.body")
    post-controls(v-model="post")
    //p.body(v-html="post.markdown_body")
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
