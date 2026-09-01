<script setup lang="ts">
const {post} = defineProps<{ post: object }>()
const {user} = useUserSession()
const deletePost = async () => {
  await useNuxtApp().$DELETE(`/post?id=${post.id}`)
  useNuxtApp().callHook('posts-load')
}


</script>

<template lang="pug">
  div.pa-3.d-flex.justify-space-between.align-center(v-if="user?.id === post?.user?.id")
    q-btn(icon="mdi-pencil" :to="`/post-edit-${post.id}`")
    span.text-red(v-if="!post.published") {{$t('Not published')}}
    button-confirm(icon="mdi-delete" color="red" :message="$t('Delete post')" :action="deletePost")
</template>

<style scoped lang="sass">

</style>