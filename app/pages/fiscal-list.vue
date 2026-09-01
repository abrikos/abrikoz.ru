<script setup lang="ts">

const router = useRouter()
const list = ref()
const headers = [
  {label: 'Дата', field: 'date', name: ''},
  {label: 'Магазин', field: 'retailPlace', name: '', align: 'left'},
  {label: 'Адрес', field: 'retailPlaceAddress', name: '', align: 'left'},
  {label: 'Сумма', field: 'sumHuman', name: ''},
  {label: 'Чек', field: 'fiscalDocumentNumber', name: ''},
]

async function load() {
  list.value = await useNuxtApp().$GET('/fiscal-list')
}

onMounted(load)

const search = ref('')

function goToFiscal(e: any, row: any) {
  router.push(`/fiscal-view-${row.id}`)
}

const filtered = computed(() => {
  return list.value.filter((v: any) => {
    for (const field in v) {
      if (headers.map(h => h.field).includes(field) && v[field].toString().toLowerCase().match(search.value?.toLowerCase())) {
        return true
      }
    }
  })
})

</script>

<template lang="pug">
  div(v-if="list")
    q-input(v-model="search" clearable label="Поиск" )
    q-table(:rows="filtered" :columns="headers" v-model:search="search" @row-click="goToFiscal" item-value="id")


</template>

<style scoped lang="sass">

</style>
