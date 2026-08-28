<script lang="ts" setup>
import {useLoaderStore} from "~/stores/loader";
import {useDisplay} from 'vuetify'

const {mobile, xs} = useDisplay()
const {locales, locale, setLocale} = useI18n()
const {loading} = storeToRefs(useLoaderStore())
const {loggedIn, user, session, clear, openInPopup} = useUserSession()
const route = useRoute()

const menuItems = computed(() => {
  return [
    {label: 'Home', caption: '', icon: 'mdi-home', link: '/'},
    {label: 'Weather', caption: 'Yakutsk 5 days weather', icon: 'mdi-weather-cloudy', link: '/weather'},
    {
      label: 'Posts', children: [
        {label: 'Add post', icon: 'mdi-playlist-plus', link: '/post-create', hide: !user.value},
        {label: 'My posts', icon: 'mdi-text-account', link: '/post-my', hide: !user.value},
        {label: 'Post view', icon: 'mdi-text-account', link: route.fullPath, hide: route.name!=='post-view-id'},
        {label: 'Post edit', icon: 'mdi-text-account', link: route.fullPath, hide: route.name!=='post-edit-id'},
      ]
    },
    {label: 'Links', children: [
        {label: 'All', icon: 'mdi-link-box', link: '/links-all'},
        {label: 'My', icon: 'mdi-link-lock', link: '/links-my', hide: !user.value},
        {label: 'Map', icon: 'mdi-map-legend', link: '/links-map'},
        {label: 'Add', icon: 'mdi-link-plus', link: '/links-add', hide: !user.value},
      ]},
    {label: 'Territory', icon: 'mdi-map-legend', link: '/territory'},
  ].filter(i => !i.hide).map(i=> {
    i.children = i.children ? i.children.filter(i1 => !i1.hide) : []
    return i
  })
})

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const router = useRouter()
const drawer = ref(!mobile)

async function login(provider: string) {
  openInPopup(`/api/auth/${provider}`, {width: 600, height: 600})
}
console.log(route)
</script>

<template lang="pug">
  div.common-layout
    v-app
      v-app-bar
        template(v-slot:prepend)
          v-app-bar-nav-icon(@click="drawer = !drawer")
        v-app-bar-title Abrikos HP
        v-spacer
        v-menu
          template(v-slot:activator="{props}")
            v-btn(v-bind="props" icon="mdi-translate" :title="$t('Translate')")
          v-card
            v-list
              v-list-item(:title="l.name" @click="setLocale(l.code)" density="compact" v-for="l in availableLocales")
        v-spacer
        v-menu(v-if="user")
          template(v-slot:activator="{props}")
            user-card(:user="user" v-bind="props")
          v-card.mt-2
            v-list
              v-list-item(:title="$t('Logout')" @click="clear" density="compact" )
        v-menu(v-else)
          template(v-slot:activator="{props}")
            v-btn(v-bind="props") {{$t('Login')}}
          v-card.mt-2
            v-list
              v-list-item(title="Github" @click="login('github')")
              v-list-item(title="Google" @click="login('google')")
              v-list-item(title="Yandex" @click="login('yandex')")
      v-navigation-drawer(v-model="drawer" location="left" :temporary="mobile")
        v-list
          v-list-item.menu-section(v-for="item in menuItems" :to="item.link" :title="$t(item.label)")
            template(v-slot:prepend)
              v-icon(:icon="item.icon" v-if="item.icon")
            v-list(v-if="item.children")
              v-list-item(v-for="subItem in item.children" :to="subItem.link") {{ $t(subItem.label) }}
                template(v-slot:prepend)
                  v-icon(:icon="subItem.icon")

      v-main
        v-progress-linear(indeterminate v-if="loading" )
        v-container(fluid)
          NuxtPage

</template>

<style scoped lang="sass">
.menu-section
  border-bottom: 1px solid silver
</style>