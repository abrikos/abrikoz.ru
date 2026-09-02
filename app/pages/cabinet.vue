<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const {user, openInPopup, fetch} = useUserSession()
const strategies = computed(() => {
  return ['google', 'github', 'yandex'].filter(s => !user.value?.strategies.map(v => v.strategy).includes(s))
})

async function login(provider: string) {
  openInPopup(`/api/auth/${provider}`, {width: 600, height: 600})
}

async function setStrategy(active: number) {
  await useNuxtApp().$PATCH('/user', {active})
  await fetch()
}
async function unsetStrategy(active: number) {
  await useNuxtApp().$PATCH('/user-unset-strategy', {active})
  await fetch()
}

</script>

<template lang="pug">
  q-card.q-ma-sm(style="width:300px")
    q-toolbar
      span {{$t('Add login strategy')}}
    q-card-section
      q-btn(v-for="s in strategies" :label="s" @click="login(s)")

  q-card.q-ma-sm(style="width:300px")
    q-toolbar
      span {{$t('Set active strategy for current user')}}
    q-card-section
      q-btn(v-for="(s,i) in user.strategies" :label="s.strategy" @click="setStrategy(i)" :disable="i===user.active" )

  q-card.q-ma-sm(style="width:300px" v-if="user.strategies.length > 1")
    q-toolbar
      span {{$t('Disable strategy for current user')}}
    q-card-section
      q-btn(v-for="(s,i) in user.strategies" :label="s.strategy")
        q-popup-proxy
          q-banner {{$t('Disable strategy')}} {{s.strategy}}?
            q-btn(label="OK" size="sm" color="primary" @click="unsetStrategy(i)" v-close-popup)
            q-btn(label="Cancel" size="sm" v-close-popup)

</template>

<style scoped lang="sass">

</style>