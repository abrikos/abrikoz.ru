<script setup lang="ts">

const {post} = defineProps<{ post: object }>()

</script>

<template lang="pug">
div.pa-2
  h1 {{ post.title }}
  div.bg-grey.pa-2.d-flex.justify-space-between.no-wrap
    strong {{post.short}}
    div.mx-2(v-if="post.poster")
      img.poster(:src="post.poster")

  post-controls(:post="post")
  mark-down.mark-down(:text="post.text")
  //p.body(v-html="post.markdown_body")

</template>

<style lang="sass">
img.poster
  max-width: 300px
.mark-down
  img
    max-width: 300px
    max-height: 300px
video
  border: 1px solid red
  width: 300px
  height: 300px
</style>
