<script lang="ts" setup>
import {useLoaderStore} from "~/stores/loader";

const { locales, locale, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const {loading} = storeToRefs(useLoaderStore())
const {loggedIn, user, session, clear, openInPopup} = useUserSession()
const drawerLeft = ref(true)
const drawerRight = ref(true)
const bar = ref()

const menuItems = computed(() => {
  return [
    {label: 'Home', caption: '', icon: 'mdi-home', link: '/'},
    {label: 'Weather', caption: 'Yakutsk 5 days weather', icon: 'mdi-weather-cloudy', link: '/weather'},
    {label: 'Add post', icon: 'mdi-playlist-plus', link: '/post-create', hide: !user.value},
    {label: 'My posts', icon: 'mdi-text-account', link: '/post-my', hide: !user.value},
    {label: 'Links', icon: 'mdi-link-edit', link: '/links-all', hide: !user.value},
    {label: 'Territory', icon: 'mdi-map-legend', link: '/territory'},
  ].filter(i=>!i.hide)
})

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const router = useRouter()
const drawer = ref(false)
async function login(provider: string) {
  openInPopup(`/api/auth/${provider}`,{width:600, height:600})
}

</script>

<template lang="pug">
  div.common-layout
    v-app
      v-progress-linear(indeterminate v-if="loading" )
      v-app-bar
        template(v-slot:prepend)
          v-app-bar-nav-icon.d-sm-none.d-block(@click="drawer = !drawer")
        v-app-bar-title Abrikos HP
        div.d-none.d-sm-block
          v-btn(v-for="item in menuItems" :to="item.link" ) {{ $t(item.label) }}
        v-spacer
        v-menu
          template(v-slot:activator="{props}")
            v-btn(v-bind="props" icon="mdi-translate")
          v-card
            v-list
              v-list-item(:title="l.name" @click="setLocale(l.code)" density="compact" v-for="l in availableLocales")
        v-menu(v-if="user")
          template(v-slot:activator="{props}")
            user-card(:user="user" v-bind="props")
          v-card.mt-2
            v-list
              v-list-item(title="Logout" @click="clear" density="compact" )
        v-menu(v-else)
          template(v-slot:activator="{props}")
            v-btn(v-bind="props") Login
          v-card.mt-2
            v-list
              v-list-item(title="Github" @click="login('github')")
              v-list-item(title="Google" @click="login('google')")
              v-list-item(title="Yandex" @click="login('yandex')")
      v-navigation-drawer.d-sm-none.d-block(v-model="drawer" location="left" temporary)
        v-list
          v-list-item(v-for="item in menuItems" :to="item.link" :title="$t(item.label)")
      v-main
        v-container(fluid)
          NuxtPage

  //div
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
              q-item-label {{item.label}}
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