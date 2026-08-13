<script setup lang="ts">
const model = defineModel()
const {item} = defineProps<{item?:object}>()

const link = computed(()=>{
  return model.value|| item
})
</script>

<template lang="pug">
q-card(style="width: 400px" v-if="link")
  q-card-section(style="word-break: break-word;")
    div.text-h6 {{ link.title }}
    q-img(:src="link.ogImage")
    div.text-subtitle2 {{ link.ogDescription || link.description }}
    hr
    a(:href="link.url" target="_blank" rel="noopener noreferrer") {{link.url}}
</template>

<style scoped lang="sass">

</style>