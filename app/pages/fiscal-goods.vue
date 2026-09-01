<script setup lang="ts">

const router = useRouter()
const  list =ref([])
async function load(){
  list.value  = await useNuxtApp().$GET('/fiscal-goods') as unknown as never[]
}
onMounted(load)
const headers = [
    {label: 'Наименование', field: 'name', name:'', align: 'left'},
    {label: 'Кол-во', field: 'quantity', name:''},
    {label: 'Цена', field: 'priceHuman', name:''},
    {label: 'Сумма', field: 'sum', name:''},
    {label: 'Дата', field: (row)=>row.fiscal.date, name:''},
    {label: 'Магазин', field: (row)=>row.fiscal.retailPlaceFull, name:''},

]
const search = ref('')

function goToFiscal(e: any, row: any) {
  console.log(row)
    navigateTo(`/fiscal-view-${row.item.fiscal.id}`)
}

const filtered = computed(()=>{
  return list.value.filter((v:any)=>{
    for(const field in v){
      if(headers.map(h=>h.field).includes(field) && v[field].toString().toLowerCase().match(search.value.toLowerCase())){ return true }
    }
  })
})



</script>

<template lang="pug">
q-input(v-model="search" clearable label="Поиск" )
q-table(:rows="filtered" :columns="headers" v-model:search="search" @click:row="goToFiscal" item-value="id" :dense="$q.screen.lt.md")


</template>

<style scoped lang="sass">

</style>
