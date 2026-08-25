<script lang="ts" setup>
import {useLoaderStore} from "~/stores/loader";

const {loading} = storeToRefs(useLoaderStore())
const {loggedIn, user, session, clear, openInPopup} = useUserSession()
const drawerLeft = ref(true)
const drawerRight = ref(true)
const bar = ref()

const menuItems = computed(() => {
  return [
    {title: 'Home', caption: '', icon: 'mdi-home', link: '/'},
    {title: 'Weather', caption: 'Yakutsk 5 days weather', icon: 'mdi-weather-cloudy', link: '/weather'},
    {title: 'Add post', icon: 'mdi-playlist-plus', link: '/post-create', hide: !user.value},
    {title: 'My posts', icon: 'mdi-text-account', link: '/post-my', hide: !user.value},
    {title: 'Links', icon: 'mdi-link-edit', link: '/links-all', hide: !user.value},
  ].filter(i=>!i.hide)
})

const router = useRouter()

async function login(provider: string) {
  openInPopup(`/api/auth/${provider}`,{width:600, height:600})
}

</script>


<template lang="pug">
  q-linear-progress#progress(color="orange" indeterminate v-if="loading" )
  q-ajax-bar(ref="loader" position="bottom" skip-hijack)
  q-layout(view="hHh lpR lff")
    q-header(reveal)
      q-toolbar
        q-btn(flat @click="drawerLeft=!drawerLeft" round dense icon="mdi-menu" )
        q-space
        q-item
          q-item-section
            q-btn(v-if="loggedIn" flat)
              user-card(:user="user" )
              q-menu
                q-list
                  q-item(clickable v-close-popup @click="clear" )
                    q-item-section Logout

            q-btn(label="Login" flat v-else)
              q-menu
                q-list
                  q-item(clickable v-close-popup @click="login('github')")
                    q-item-section Login with GitHub
                  q-item(clickable v-close-popup @click="login('google')")
                    q-item-section Login with Google
                  q-item(clickable v-close-popup @click="login('yandex')")
                    q-item-section Login with Yandex

    q-footer Footer
    client-only
      q-drawer(v-model="drawerLeft")
        q-list
          q-item(v-for="item in menuItems" clickable tag="a"  :to="item.link")
            q-item-section(avatar)
              q-icon(:name="item.icon" color="blue" )
            q-item-section
              q-item-label {{item.title}}
              q-item-label( caption) {{item.caption}}




    //q-drawer(v-model="drawerRight" side="right" :breakpoint="500" bordered)
      q-scroll-area.fit DR right
    q-page-container
      q-page
        NuxtPage
</template>

<style scoped lang="sass">
#progress
  position: absolute
  height: 10px
  z-index: 100000000

</style>