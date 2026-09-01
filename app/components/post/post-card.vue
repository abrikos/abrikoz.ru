<script setup lang="ts">

const {user} = useUserSession()


const {post} = defineProps<{ post: object }>()


</script>

<template lang="pug">
  q-card.q-ma-sm.bg-grey-5(v-if="post" style="width:300px")

    q-toolbar.flex.justify-between(color="transparent" )
      q-toolbar-title
        router-link(:to="`/post-view-${post.id}`") {{post.title}}
      user-card(:user="post.user")
    q-parallax(:src="post.poster" :height="150")
    q-card-section.ellipsis-3-lines {{post.short}}
    q-card-actions
      post-controls(:post="post")


</template>

<style lang="sass">
.v-card__image
  opacity: .2


</style>
