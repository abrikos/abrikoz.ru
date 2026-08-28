<script setup lang="ts">

const router = useRouter()
const  list =ref([])
async function load(){
  list.value  = await useNuxtApp().$GET('/fiscal-goods') as unknown as never[]
}
onMounted(load)
const headers = [
    {title: 'Наименование', key: 'name', name:'', align: 'left'},
    {title: 'Кол-во', key: 'quantity', name:''},
    {title: 'Цена', key: 'priceHuman', name:''},
    {title: 'Сумма', key: 'sum', name:''},
    {title: 'Дата', key: 'fiscal.date', name:''},
    {title: 'Магазин', key: 'fiscal.retailPlaceFull', name:''},

]
const search = ref('')

function goToFiscal(e: any, row: any) {
  console.log(row)
    navigateTo(`/fiscal-view-${row.item.fiscal.id}`)
}

const filtered = computed(()=>{
  return list.value.filter((v:any)=>{
    for(const key in v){
      if(headers.map(h=>h.key).includes(key) && v[key].toString().toLowerCase().match(search.value.toLowerCase())){ return true }
    }
  })
})



</script>

<template lang="pug">
v-text-field(v-model="search" clearable label="Поиск" )
//q-table(:rows="fiscal" :headers="headers" v-model:search="search" @click:row="goToFiscal" item-value="id")
v-data-table(:items="filtered" :headers="headers" @click:row="goToFiscal" :pagination="{rowsPerPage:10}")

</template>

<style scoped lang="sass">

</style>
