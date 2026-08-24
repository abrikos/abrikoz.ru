<script setup lang="ts">
const {data:list} = await useFetch(`/api/post-list`)
</script>

<template lang="pug">
div {{ list }}
</template>

<style scoped lang="sass">

</style>