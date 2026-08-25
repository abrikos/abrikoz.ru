<script setup lang="ts">
const {post} = defineProps<{ post: object }>()
const {user} = useUserSession()
const deletePost = async () => {
  await useNuxtApp().$DELETE(`/post?id=${post.id}`)
  useNuxtApp().callHook('posts-load')
}


</script>

<template lang="pug">
  div.pa-3.d-flex.justify-space-between.align-center(:class="post.published? '':'bg-red-lighten-4'" v-if="user?.id === post?.user?.id")
    v-btn(size="sm" icon="mdi-pencil" :to="`/post-edit-${post.id}`")
    span(v-if="!post.published") Not published
    v-btn(size="sm" icon="mdi-delete" flat @click.stop="deletePost(post.id)" :color="post.published? 'red':''")

</template>

<style scoped lang="sass">

</style>