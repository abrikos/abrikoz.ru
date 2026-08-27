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
  div.d-flex(v-if="post")
    div.w-50
      v-form(@submit="onSubmit")
        v-card-text
          v-text-field(v-model="post.title" :label="$t('Title')" required)
          v-text-field(v-model="post.poster" :label="$t('Poster image url')" hint="Place link for any image")
            template(v-slot:prepend)
              v-icon(icon="mdi-image")
          v-textarea(v-model="post.short" :label="$t('Short')" auto-grow)

          v-textarea(v-model="post.text" :label="$t('Text')" auto-grow)
            template(v-slot:append)

              v-dialog(max-width="500" activator="parent" )
                template(v-slot:activator="{props}")
                  v-icon(icon="mdi-help" v-bind="props")
                template(v-slot:default="{isActive}")
                  v-card
                    v-card-title.d-flex.justify-space-between.align-center
                      v-icon(icon="mdi-help")
                      v-icon(icon="mdi-close" @click="isActive.value=false")
                    v-card-text
                      a(href="https://skillbox.ru/media/code/yazyk-razmetki-markdown-shpargalka-po-sintaksisu-s-primerami/" target="_blank") Markdown syntax
          div.d-flex.justify-space-between
            div
              v-checkbox(v-model="post.published" :label="$t('Show for all')")
            div.text-right {{ post.date  }}

        v-card-actions.d-flex.justify-space-between
          v-btn(type="submit" color="primary" variant="outlined" ) {{$t(route.params.id ? 'Save':'Create')}}

    div.w-50
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