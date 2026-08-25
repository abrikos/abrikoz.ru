<script setup lang="ts">

const {user} = useUserSession()


const {post} = defineProps<{ post: object }>()


</script>

<template lang="pug">
  div.post-card(v-if="post")
    v-card.q-ma-sm.bg-grey-lighten-1(:append-avatar="post.user.avatar" :title="post.title" :text="post.short" max-height="200px" :image="post.poster")
      v-card-text
        post-controls(:post="post")


</template>

<style scoped lang="sass">
.v-card-title
  display: none
.post-card
  width: 600px

.text
  overflow: hidden
  max-height: 100px

img
  //float: left
  margin: 10px
  max-height: 100px
  max-width: 100px
</style>
