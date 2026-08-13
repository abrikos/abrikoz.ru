<script setup lang="ts">
const model = defineModel()
const {item, refresh} = defineProps<{ item?: object, refresh?: () => void }>()
const {user} = useUserSession()
const link = computed(() => {
  return model.value || item
})

async function changeHidden() {
  await useNuxtApp().$GET('/link-hide?id=' + item.id)
  refresh && refresh()
}
</script>

<template lang="pug">
  q-card.column.no-wrap.q-ma-sm(style="width: 400px; height:400px" v-if="link")
    q-card-section(style="word-break: break-word; overflow-y:scroll")
      div.text-h6 {{ link.title }}
      q-img(:src="link.ogImage")
      div.text-subtitle2 {{ link.ogDescription || link.description }}
      a(:href="link.url" target="_blank" rel="noopener noreferrer") {{link.url}}
    q-card-actions.q-mt-auto(v-if="user.id === link.user" align="right")
      button-confirm(icon="mdi-delete" size="sm" color="red" message="Delete link" :route="`/link-remove?id=${link.id}`" :action="refresh")
      q-toggle(v-model="link.hidden" @update:model-value="changeHidden" label="Hidden" )
</template>

<style scoped lang="sass">

</style>