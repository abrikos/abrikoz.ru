<script setup lang="ts">
const {loggedIn, user} = useUserSession()
const route = useRoute()
const post = defineModel()
console.log('zzzzzz', post.value)
const $q = useQuasar()


</script>

<template lang="pug">
  div.row.q-gutter-md(v-if="post")
    div.col-sm.q-pa-lg
      q-card
        q-form(@submit="onSubmit" @reset="onReset")
          q-card-section
            q-input(v-model="post.title" label="Title" :error="!post.title" error-message="Required")
            q-input(v-model="post.poster" label="Poster image url" hint="Place link for any image")
              template(v-slot:prepend)
                q-icon(name="mdi-image")
            q-input(v-model="post.short" label="Short" type="textarea"  filled autogrow  :error="!post.short" error-message="Required")


            q-input(v-model="post.body" label="Body (accepts markdown syntax)" type="textarea" filled autogrow)
              template(v-slot:append)

                q-icon(name="mdi-help")
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
      q-file(v-model="poster" @update:model-value="upload" label="Upload images" multiple)
      div.images.flex
        div.q-pa-sm(v-for="image of post.images")
          div.image.flex.items-center
            img(:src="image")
          div
            q-btn(size="sm" icon="mdi-image" @click="post.poster=image")
              q-tooltip Poster image
            q-btn(size="sm" icon="mdi-text" @click="addImage(image)")
              q-tooltip In text

    div.col-sm
      router-link(:to="`/posts/${route.params.id}`") View Post
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