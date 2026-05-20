<script setup lang="ts">
const body = ref({})

async function onSubmit() {
  if (body.id) {

  } else {
    const res = await useNuxtApp().$POST("/blog/post", body.value)
    console.log(res)
  }
}
</script>

<template lang="pug">
  q-form(@submit="onSubmit")
    q-input(v-model="body.title" label="Title" outlined)
    q-input(v-model="body.short" label="Short" outlined)
    q-input(v-model="body.text" label="Body" outlined)
    q-input(v-model="body.poster" label="Poster" outlined)
    q-btn(label="Submit" color="primary" type="submit")
    q-btn(label="Reset" type="reset")
</template>

<style scoped lang="sass">

</style>