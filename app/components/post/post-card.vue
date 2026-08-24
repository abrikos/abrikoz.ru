<script setup lang="ts">

const {user} = useUserSession()


const {post} = defineProps<{ post: object }>()


</script>

<template lang="pug">
div.post-card(v-if="post")
  q-card.q-ma-sm.bg-grey-4
    div.q-pa-md
      router-link.text-blue(:to="`/post-view-${post.id}`")  {{ post.title }}
      div.flex.justify-between.items-center
        small
          i {{ post.date }}
        //q-rating(v-model="post.rate" disable max="5" icon="mdi-star-outline" color="red" icon-selected="mdi-star"  icon-half="mdi-star-half-full")
        user-card(:user="post.user" )
    q-separator(inset)
    div.text.q-pa-sm.flex.justify-between.no-wrap
      span {{post.short}}
      div
        img(:src="post.poster" v-if="post.poster")
    post-controls(:post="post")


</template>

<style scoped lang="sass">
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
