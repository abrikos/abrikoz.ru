<script lang="ts" setup>
const {loggedIn, user, session, fetch, clear, openInPopup} = useUserSession()
// console.log('1', loggedIn.value)
// console.log('2', user.value)
const drawerLeft = ref(true)
const drawerRight = ref(true)
const bar = ref()

const menuItems = computed(() => {
  return [
    {title: 'Home', caption: '', icon: 'mdi-home', link: '/', show: true},
    {title: 'Weather', caption: 'Yakutsk 5 days weather', icon: 'mdi-weather-cloudy', link: '/weather', show: true},
  ]
})

async function login(provider:string){
  const {data} = await $fetch(`/api/auth/${provider}`)
  console.log(data)
}

</script>


<template lang="pug">
  q-ajax-bar(ref="bar" position="bottom" skip-hijack)
  q-layout(view="hHh Lpr lff")
    q-header(reveal)
      q-toolbar
    q-footer Footer
    q-drawer(v-model="drawerLeft" :breakpoint="700" bordered)
      q-list
        q-item(v-for="item in menuItems.filter(i=>i.show)" clickable tag="a"  :to="item.link")
          q-item-section(avatar)
            q-icon(:name="item.icon" color="blue" )
          q-item-section
            q-item-label {{ item.title }}
            q-item-label( caption) {{ item.caption }}

        q-item
          q-item-section
            q-btn(label="Logout" @click="clear" v-if="loggedIn")
              user-card(:user="user" )
            q-btn(label="Login" v-else)
              q-menu
                q-list
                  q-item(clickable v-close-popup href="/api/auth/github")
                    q-item-section Login with GitHub
                  q-item(clickable v-close-popup href="/api/auth/google")
                    q-item-section Login with Google

    //q-drawer(v-model="drawerRight" side="right" :breakpoint="500" bordered)
      q-scroll-area.fit DR right
    q-page-container
      q-page
        NuxtPage
</template>

<style scoped lang="sass">
</style>