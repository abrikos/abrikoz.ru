<script setup lang="ts">
const route = useRoute()
const {data:post} = useFetch('/posts/' + route.params.id)

</script>

<template lang="pug">
    post-form(:post="post")
</template>

<style scoped>

</style>