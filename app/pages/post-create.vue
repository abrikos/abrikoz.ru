<script setup lang="ts">
const post = ref({published:false})
</script>

<template lang="pug">
  post-form(v-model="post")
</template>

<style scoped lang="sass">

</style>