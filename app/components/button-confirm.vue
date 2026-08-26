<script setup lang="ts">
const {route, label, message, icon, action,color} = defineProps<{
  route: string,
  label?: string,
  color?: string,
  message: string,
  icon: string,
  action?: () => void
}>()

async function submit() {
  await useNuxtApp().$GET(route)
  action && action()
}
</script>

<template lang="pug">
  v-dialog(max-width="600px")
    template(v-slot:activator="{props}")
      v-btn(:icon='icon' v-bind="props" :color="color")
    v-card
      v-card-text
        v-banner(color="red" ) {{message}}
      v-card-actions
        v-btn(label="OK" size="sm" color="primary" @click="submit") OK
        v-btn(label="Cancel" size="sm") Cancel
</template>

<style scoped lang="sass">

</style>