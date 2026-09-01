<script setup lang="ts">
const {loggedIn, user} = useUserSession()
const route = useRoute()
const post = defineModel()

async function onSubmit() {
  if (!post.value?.id) {
    const newPost = await useNuxtApp().$PUT(`/post`, post.value)
    navigateTo(`/post-view-${newPost.id}`)
  } else {
    useNuxtApp().$POST(`/post?id=${post.value.id}`, post.value)
  }
}

function onReset() {

}

function upload() {

}
</script>

<template lang="pug">
  div.row(v-if="post")
    div.col
      q-form(@submit="onSubmit")
        q-input(v-model="post.title" :label="$t('Title')" required)
        q-input(v-model="post.poster" :label="$t('Poster image url')" hint="Place link for any image")
          template(v-slot:prepend)
            q-icon(name="mdi-image")
        q-input(type="textarea" v-model="post.short" :label="$t('Short')" auto-grow)

        q-input(type="textarea" v-model="post.text" :label="$t('Text')" auto-grow)
          template(v-slot:append)
            q-icon(name="mdi-help")
              q-popup-proxy
                q-banner
                  a(href="https://skillbox.ru/media/code/yazyk-razmetki-markdown-shpargalka-po-sintaksisu-s-primerami/" target="_blank") Markdown syntax
            q-tooltip Markdown syntax

        div.flex.justify-space-between
          div
            q-checkbox(v-model="post.published" :label="$t('Show for all')")
          div.text-right {{ post.date  }}

        q-card-actions.d-flex.justify-space-between
          q-btn(type="submit" color="primary" variant="outlined" ) {{$t(route.params.id ? 'Save':'Create')}}

    div.col
      div.preview
        router-link(:to="`/post-view-${route.params.id}`" v-if="route.params.id") {{$t('Go to post')}}
        post-view(:post="post")


</template>

<style scoped lang="sass">
.images
  .image
    height: 100px

    img
      max-height: 100px
      max-width: 100px

.preview
  border: 1px solid black
  //transform: scale(.7)
  //transform-origin: top left
//transition: scale 0.3s ease

</style>