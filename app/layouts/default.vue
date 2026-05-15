<script lang="ts" setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()
// console.log('1', loggedIn.value)
// console.log('2', user.value)


</script>


<template lang="pug">
  router-link(to="/") Home
  q-btn(to="/post-add" icon="mdi-plus")
  router-link(to="/about") About
  a(href="/api/auth/github" v-if="!loggedIn") Login with GitHub
  q-btn(label="Logout" @click="clear" v-else)
    template(v-slot:prepend)
      div zzzz
  hr
  NuxtPage
</template>

<style scoped lang="sass">
</style>