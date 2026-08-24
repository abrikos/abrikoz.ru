<script setup lang="ts">
const {post} = defineProps<{post:object}>()
const {user} = useUserSession()
const deletePost = async () => {
  await useNuxtApp().$DELETE(`/post?id=${post.id}`)
  useNuxtApp().callHook('posts-load')
}

</script>

<template lang="pug">
  div.flex.justify-between(:class="post.published? '':'bg-red-4'" v-if="user?.id === post?.user.id")
    q-toggle( v-model="post.published" label="Show for all")
    div
      q-btn(size="sm" icon="mdi-pencil" :to="`/post-edit-${post.id}`" flat)
      q-btn(icon="mdi-delete" flat @click.stop :color="post.published? 'red':''")
        q-tooltip Удалить "{{post.title}}"
        q-popup-proxy(cover transition-show="scale" transition-hide="scale")
          q-banner Удалить "{{post.title}}"?
            br
            q-btn( @click.stop="deletePost(post.id)" label="OK" v-close-popup color="negative" )
            q-btn( @click.stop label="Отмена" v-close-popup)

</template>

<style scoped lang="sass">

</style>