<script setup lang="ts">
const {route, label, message, icon, action,color} = defineProps<{
  route?: string,
  label?: string,
  color?: string,
  message: string,
  icon: string,
  action?: () => void
}>()

async function submit() {
  route && await useNuxtApp().$GET(route)
  action && action()
}
</script>

<template lang="pug">
  q-btn(:label='label' :icon='icon' :color="color")
    q-popup-proxy
      q-banner {{message}}
        q-btn(label="OK" size="sm" color="primary" @click="submit" v-close-popup)
        q-btn(label="Cancel" size="sm" v-close-popup)

</template>

<style scoped lang="sass">

</style>