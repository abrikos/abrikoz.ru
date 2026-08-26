<script setup lang="ts">

const {user} = useUserSession()


const {post} = defineProps<{ post: object }>()


</script>

<template lang="pug">
  v-card.w-25.q-ma-sm.bg-grey-lighten-1(v-if="post" :image="post.poster")
    v-toolbar.d-flex.justify-space-between(color="transparent" )
      v-toolbar-title {{post.title}}
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
