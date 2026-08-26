<script setup lang="ts">

const {user} = useUserSession()


const {post} = defineProps<{ post: object }>()


</script>

<template lang="pug">
  v-card.w-sm-25.ma-2.bg-grey-lighten-1(v-if="post" :image="post.poster")
    v-toolbar.d-flex.justify-space-between(color="transparent" )
      v-toolbar-title
        router-link(:to="`/post-view-${post.id}`") {{post.title}}
      user-card(:user="post.user")
    v-card-text
      small {{post.short}}
    v-card-actions
      post-controls(:post="post")


</template>

<style lang="sass">
.v-card__image
  opacity: .2


</style>
