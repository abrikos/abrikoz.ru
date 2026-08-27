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
  v-dialog(max-width="600px")
    template(v-slot:activator="{props}")
      v-btn(:icon='icon' v-bind="props" :color="color" variant="plain")
    template(v-slot:default="{ isActive }")
      v-banner(color="red" ) {{message}}
        template(v-slot:actions)
          v-btn(label="OK" color="primary" @click="submit();isActive.value=false") OK
          v-btn(label="Cancel" @click="isActive.value=false") Cancel
</template>

<style scoped lang="sass">

</style>