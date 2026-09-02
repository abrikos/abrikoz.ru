<script setup lang="ts">
import noAvatar from '~/assets/no-avatar.png'
import type {IUser} from "#server/models/user.model.ts";
interface Props {
  user?: IUser;
}
const {user} = defineProps<Props>()
const avatar = computed(() => {
  return user?.avatar_url || noAvatar
})

</script>

<template lang="pug">
  q-avatar(v-if="user")
    img(:src="avatar")
    q-tooltip {{user?.name}}
</template>

<style scoped lang="sass">
img
  border: 1px solid silver
  max-height: 100px
  object-fit: fill
</style>
