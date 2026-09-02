<script lang="ts" setup>
import {useLoaderStore} from "~/stores/loader";
import langRu from 'quasar/lang/ru'
import langEn from 'quasar/lang/en-GB'
import {useQuasar} from 'quasar'

const $q = useQuasar()

// Set it globally
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
      label: 'Posts', icon: 'mdi-note', children: [
        {label: 'Add post', icon: 'mdi-note-plus', link: '/post-create', hide: !user.value},
        {label: 'My posts', icon: 'mdi-file-account', link: '/post-my', hide: !user.value},
        {label: 'Post view', icon: 'mdi-file-eye', link: route.fullPath, hide: route.name !== 'post-view-id'},
        {label: 'Post edit', icon: 'mdi-file-edit', link: route.fullPath, hide: route.name !== 'post-edit-id'},
      ]
    },
    {
      label: 'Games', icon: 'mdi-gamepad', children: [
        {label: 'Minesweeper', icon: 'mdi-mine', link: '/minesweeper'},
      ]
    },
    {
      label: 'Links', icon: 'mdi-link', children: [
        {label: 'All', icon: 'mdi-link-box', link: '/links-all'},
        {label: 'My', icon: 'mdi-link-lock', link: '/links-my', hide: !user.value},
        {label: 'Map', icon: 'mdi-map-legend', link: '/links-map'},
        {label: 'Add', icon: 'mdi-link-plus', link: '/links-add', hide: !user.value},
      ]
    },
    {label: 'Territory', icon: 'mdi-map-legend', link: '/territory'},
    {
      label: 'Fiscal', icon: 'mdi-finance', hide: !user.value, children: [
        {label: 'Fiscal list', icon: 'mdi-list-box', link: '/fiscal-list'},
        {label: 'Fiscal goods', icon: 'mdi-basket-fill', link: '/fiscal-goods'},
        {label: 'Fiscal monthly', icon: 'mdi-finance', link: '/fiscal-monthly'},
        {label: 'Upload', icon: 'mdi-upload-box', link: '/fiscal-upload'},
      ]
    },
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
  } else {
    navigateTo('/')
  }
})

const menuExpanded = useCookie('menu-expanded', {default: () => ({})})

function localize(locale: "en" | "ru") {
  setLocale(locale)
  if (locale === 'ru') {
    $q.lang.set(langRu)
  } else {
    $q.lang.set(langEn)
  }
}

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
              q-item(clickable v-close-popup @click="localize(l.code)" v-for="l in availableLocales")
                q-item-section {{l.name}}

    q-drawer(v-model="drawer"  :breakpoint="1024"       show-if-above      bordered)
      q-list(padding)
        div(v-for="item in menuItems")
          q-item(v-if="!item.children?.length" clickable v-ripple :to="item.link" :aria-label="$t(item.label)")
            q-item-section(avatar)
              q-icon(:name="item.icon")
            q-item-section {{$t(item.label)}}
          q-expansion-item(v-else v-model="menuExpanded[item.label]" :icon="item.icon" :label="$t(item.label)" :xdisable="!item.children?.length"  dense dense-toggle group="somegroup" expand-separator)
            q-item-section
            q-item-section
              q-list(v-if="item.children?.length")
                q-item(v-for="subItem in item.children" :to="subItem.link" :aria-label="$t(subItem.label)")
                  q-item-section(avatar)
                    q-icon(:name="subItem.icon")
                  q-item-section {{$t(subItem.label)}}
          q-separator
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