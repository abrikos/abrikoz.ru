<script setup lang="ts">
const route = useRoute()
const post = ref()
async function load(){
  post.value = await useNuxtApp().$GET(`/post?id=${route.params.id}`)
}
onMounted(load)
</script>

<template lang="pug">
  post-form(v-if="post" v-model="post")
</template>

<style scoped lang="sass">

</style>