<script setup lang="ts">

const {post} = defineProps<{ post: object }>()

</script>

<template lang="pug">
div.pa-2
  div.text-h4 {{ post.title }}
  div.bg-grey.q-pa-sm.row.gt-sm
    q-img.col-4(:src="post.poster" v-if="post.poster")
    strong.col-8.q-px-sm {{post.short}}
  div.lt-sm
    q-img(:src="post.poster")
    strong {{post.short}}
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
