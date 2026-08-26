<script setup lang="ts">
const {loggedIn, user} = useUserSession()
const route = useRoute()
const post = defineModel()

async function onSubmit(){
  if(!post.value?.id) {
    const newPost = await useNuxtApp().$PUT(`/post`, post.value)
    navigateTo(`/post-view-${newPost.id}`)
  }else{
    useNuxtApp().$POST(`/post?id=${post.value.id}`, post.value)
  }
}
function onReset(){

}

function upload(){

}
</script>

<template lang="pug">
  div.d-flex(v-if="post")
    div.w-50
      v-card
        v-form(@submit="onSubmit" @reset="onReset")
          v-card-text
            v-text-field(v-model="post.title" label="Title" required)
            v-text-field(v-model="post.poster" label="Poster image url" hint="Place link for any image")
              template(v-slot:prepend)
                v-icon(icon="mdi-image")
            v-textarea(v-model="post.short" label="Short" auto-grow)


            v-textarea(v-model="post.text" label="Body (accepts markdown syntax)" auto-grow)
              template(v-slot:append)
                v-icon(icon="mdi-help")
                  q-popup-proxy
                    q-banner
                      a(href="https://skillbox.ru/media/code/yazyk-razmetki-markdown-shpargalka-po-sintaksisu-s-primerami/" target="_blank") Markdown syntax
                q-tooltip Markdown syntax
            div.row.items-center
              div.col
                q-toggle( v-model="post.published" label="Show for all")
              div.col.text-right {{ post.date  }}

          q-card-actions.flex.justify-between
            q-btn(type="submit" color="primary" :flat="false" :label="route.params.id ? 'Save':'Create'")
            q-btn(type="reset" :flat="false" label="Reset" v-if="route.params.id")
      //q-file(v-model="post.poster" @update:model-value="upload" label="Upload images" multiple)
      div.images.flex
        div.q-pa-sm(v-for="image of post.images")
          div.image.flex.items-center
            img(:src="image")
          div
            q-btn(size="sm" icon="mdi-image" @click="post.poster=image")
              q-tooltip Poster image
            q-btn(size="sm" icon="mdi-text" @click="addImage(image)")
              q-tooltip In text

    div.w-50
      router-link(:to="`/post-view-${route.params.id}`") Go to post
      div.preview
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
  transform: scale(.7)
  transform-origin: top left
//transition: scale 0.3s ease

</style>