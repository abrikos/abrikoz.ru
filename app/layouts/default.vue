<script lang="ts" setup>
import {useLoaderStore} from "~/stores/loader";

const {locales, locale, setLocale} = useI18n()
const {loading} = storeToRefs(useLoaderStore())
const {loggedIn, user, session, clear, openInPopup} = useUserSession()
const route = useRoute()

const menuItems = computed(() => {
  return [
    {label: 'Home', caption: '', icon: 'mdi-home', link: '/'},
    {label: 'Cabinet', caption: '', icon: 'mdi-badge-account', link: '/cabinet', hide: !user.value},
    {label: 'Weather', caption: 'Yakutsk 5 days weather', icon: 'mdi-weather-cloudy', link: '/weather'},
    {
      label: 'Posts', icon:'mdi-note', children: [
        {label: 'Add post', icon: 'mdi-note-plus', link: '/post-create', hide: !user.value},
        {label: 'My posts', icon: 'mdi-file-account', link: '/post-my', hide: !user.value},
        {label: 'Post view', icon: 'mdi-file-eye', link: route.fullPath, hide: route.name !== 'post-view-id'},
        {label: 'Post edit', icon: 'mdi-file-edit', link: route.fullPath, hide: route.name !== 'post-edit-id'},
      ]
    },
    {
      label: 'Links', icon:'mdi-link', children: [
        {label: 'All', icon: 'mdi-link-box', link: '/links-all'},
        {label: 'My', icon: 'mdi-link-lock', link: '/links-my', hide: !user.value},
        {label: 'Map', icon: 'mdi-map-legend', link: '/links-map'},
        {label: 'Add', icon: 'mdi-link-plus', link: '/links-add', hide: !user.value},
      ]
    },
    {label: 'Territory', icon: 'mdi-map-legend', link: '/territory'},
    {label: 'Fiscal', icon:'mdi-finance', hide: !user.value, children: [
        {label: 'Fiscal list', icon: 'mdi-list-box', link: '/fiscal-list'},
        {label: 'Fiscal goods', icon: 'mdi-basket-fill', link: '/fiscal-goods'},
        {label: 'Fiscal monthly', icon: 'mdi-finance', link: '/fiscal-monthly'},
        {label: 'Upload', icon: 'mdi-upload-box', link: '/fiscal-upload'},
      ]},
  ].filter(i => !i.hide).map(i => {
    i.children = i.children ? i.children.filter(i1 => !i1.hide) : []
    return i
  })
})

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const router = useRouter()
const drawer = ref()

async function login(provider: string) {
  openInPopup(`/api/auth/${provider}`, {width: 600, height: 600})
}

watch(loggedIn, (isLoggedIn) => {
  if (isLoggedIn) {
    navigateTo('/cabinet')
  }else{
    navigateTo('/')
  }
})

</script>

<template lang="pug">
  q-linear-progress#progress(indeterminate v-if="loading" )
  q-layout
    q-header
      q-toolbar
        q-btn(@click="drawer = !drawer" icon="mdi-menu" flat)
        q-toolbar-title Abrikos HP
        q-space
        q-item
          q-item-section
            q-btn(v-if="loggedIn" flat)
              user-card(:user="user" )
              q-menu
                q-list
                  q-item(clickable v-close-popup to="/cabinet" )
                    q-item-section Cabinet
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

        q-btn(icon="mdi-translate" :title="$t('Translate')" flat)
          q-menu
            q-list
              q-item(clickable v-close-popup @click="setLocale(l.code)" v-for="l in availableLocales")
                q-item-section {{l.name}}

    q-drawer(v-model="drawer"  :breakpoint="1024"       show-if-above      bordered)
      q-list(padding)
        q-item.menu-section(clickable v-ripple v-for="item in menuItems" :to="item.link" :aria-label="$t(item.label)")
          q-item-section(avatar v-if="item.icon")
            q-icon(:name="item.icon" v-if="item.icon")
          q-item-section {{$t(item.label)}}
            q-list(v-if="item.children")
              q-item(v-for="subItem in item.children" :to="subItem.link" :aria-label="$t(subItem.label)")
                q-item-section(avatar)
                  q-icon(:name="subItem.icon")
                q-item-section {{$t(subItem.label)}}

    q-page-container
      q-page
        NuxtPage

</template>

<style scoped lang="sass">
#progress
  position: absolute
  height: 10px
  z-index: 100000000

.menu-section
  border-bottom: 1px solid silver
</style>