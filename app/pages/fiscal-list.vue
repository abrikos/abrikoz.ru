<script setup lang="ts">
import {useDisplay} from 'vuetify'

const {mobile} = useDisplay()
const router = useRouter()
const list = ref()
const headers = [
  {title: 'Дата', key: 'date', name: ''},
  {title: 'Магазин', key: 'retailPlace', name: '', align: 'left'},
  {title: 'Адрес', key: 'retailPlaceAddress', name: '', align: 'left'},
  {title: 'Сумма', key: 'sumHuman', name: ''},
  {title: 'Чек', key: 'fiscalDocumentNumber', name: ''},
]

async function load() {
  list.value = await useNuxtApp().$GET('/fiscal-list')
}

onMounted(load)

const search = ref('')

function goToFiscal(e: any, row: any) {
  router.push(`/fiscal-view-${row.item.id}`)
}

const filtered = computed(() => {
  return list.value.filter((v: any) => {
    for (const key in v) {
      if (headers.map(h => h.key).includes(key) && v[key].toString().toLowerCase().match(search.value?.toLowerCase())) {
        return true
      }
    }
  })
})

</script>

<template lang="pug">
  div(v-if="list")
    v-text-field(v-model="search" clearable title="Поиск" )
    //q-table(:rows="fiscal" :headers="headers" v-model:search="search" @click:row="goToFiscal" item-value="id")
    v-data-table(
      :items="filtered"
      :headers="headers"
      @click:row="goToFiscal"
      :pagination="{rowsPerPage:10}"
      :mobile="mobile"
    )


</template>

<style scoped lang="sass">

</style>
