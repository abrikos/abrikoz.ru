<script setup lang="ts">
import {useLoaderStore} from "~/stores/loader.ts";

const {loggedIn} = useUserSession()
const {loading} = storeToRefs(useLoaderStore())

const newLink = ref({url: '', hidden: false})
const linkModel = ref()

async function addLink() {
  linkModel.value = await useNuxtApp().$POST(`/link-add`, newLink.value)

  linkModel.value && navigateTo(`/links-all`)
}

async function testLink() {
  if (!isValidUrl(newLink.value.url)) return
  linkModel.value = await useNuxtApp().$POST(`/links-test-url`, newLink.value)
}

const isValidUrl = (val: string) => {
  try {
    new URL(val);
    return true;
  } catch (_) {
    return false;
  }
}

</script>

<template lang="pug">
  v-form(@submit.prevent="addLink")
    v-text-field(hint="http / https" v-model="newLink.url" :label="$t('Link')" :rules="[val => !!val || $t('Link is required'), val => isValidUrl(val) || $t('Please enter a valid link')]" @update:model-value="testLink")
    v-checkbox(v-model="newLink.hidden" :label="$t('Hide link for others')" )
    div
      v-btn(type="submit" color="primary" :loading="loading") {{$t('Create')}}
      v-btn(@click="testLink" :loading="loading") Test
  link-card(v-if="linkModel" v-model="linkModel")

</template>

<style scoped lang="sass">

</style>