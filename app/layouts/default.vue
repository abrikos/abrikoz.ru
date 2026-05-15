<script lang="ts" setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()
// console.log('1', loggedIn.value)
// console.log('2', user.value)


</script>


<template lang="pug">
  router-link(to="/") Home
  q-btn(to="/post-add" icon="mdi-plus")
  router-link(to="/about") About
  q-btn(label="Logout" @click="clear" v-if="loggedIn")
  q-btn(label="Login" v-else)
    q-menu
      q-list
        q-item(clickable v-close-popup href="/api/auth/github")
          q-item-section Login with GitHub
        q-item(clickable v-close-popup href="/api/auth/google")
          q-item-section Login with Google
  div {{user}}
    user-card(:user="user" )
  hr
  NuxtPage
</template>

<style scoped lang="sass">
</style>