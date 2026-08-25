<script setup lang="ts">
import noAvatar from '~/assets/no-avatar.png'
interface Props {
  user?: object;
}
const {user} = defineProps<Props>()
const avatar = computed(() => {
  return user?.avatar || noAvatar
})

</script>

<template lang="pug">
  v-avatar(v-if="user")
    v-img(:src="avatar")
    v-tooltip {{user?.displayName}}
</template>

<style scoped lang="sass">
img
  border: 1px solid silver
  max-height: 100px
  object-fit: fill
</style>
