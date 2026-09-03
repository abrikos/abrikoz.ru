<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const {user, openInPopup, fetch} = useUserSession()

interface LoginStrategy {
  strategy: string
}

interface CabinetUser {
  active: number
  strategies: LoginStrategy[]
}

function isCabinetUser(value: unknown): value is CabinetUser {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Record<string, unknown>
  return typeof candidate.active === 'number'
    && Array.isArray(candidate.strategies)
    && candidate.strategies.every(strategy =>
      strategy !== null
      && typeof strategy === 'object'
      && typeof (strategy as Record<string, unknown>).strategy === 'string'
    )
}

const cabinetUser = computed<CabinetUser | null>(() => {
  return isCabinetUser(user.value) ? user.value : null
})

const strategies = computed(() => {
  const configuredStrategies = cabinetUser.value?.strategies.map(strategy => strategy.strategy) ?? []
  return ['google', 'github', 'yandex'].filter(strategy => !configuredStrategies.includes(strategy))
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
div(v-if="cabinetUser")
  q-card.q-ma-sm(style="width:300px")
    q-toolbar
      span {{$t('Add login strategy')}}
    q-card-section
      q-btn(v-for="s in strategies" :label="s" @click="login(s)")

  q-card.q-ma-sm(style="width:300px")
    q-toolbar
      span {{$t('Set active strategy for avatar and name')}}
    q-card-section
      q-btn(v-for="(s,i) in cabinetUser.strategies" :key="s.strategy" :label="s.strategy" @click="setStrategy(i)" :disable="i===cabinetUser.active" )

  q-card.q-ma-sm(style="width:300px" v-if="cabinetUser.strategies.length > 1")
    q-toolbar
      span {{$t('Disable strategy for current user')}}
    q-card-section
      q-btn(v-for="(s,i) in cabinetUser.strategies" :key="s.strategy" :label="s.strategy" @click="unsetStrategy(i)")
        q-popup-proxy
          q-banner {{$t('Disable strategy')}} {{s.strategy}}?
            q-btn(label="OK" size="sm" color="primary" @click="unsetStrategy(i)" v-close-popup)
            q-btn(label="Cancel" size="sm" v-close-popup)

</template>

<style scoped lang="sass">

</style>