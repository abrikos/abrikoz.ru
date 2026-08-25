<script setup lang="ts">
const {data, refresh} = useFetch(`/api/post-list?my=1`)
useNuxtApp().hook('posts-load', refresh)
</script>

<template lang="pug">
  div.flex
    post-card(v-for="post in data" :post="post")
</template>

<style scoped lang="sass">

</style>