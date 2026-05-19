<script setup lang="ts">
const {data} = useFetch('/api/weather/all')
const chartData = computed(()=>{
  return {
    labels:['a','b'],
    datasets: [{
      data: [3,5],
      backgroundColor: ['red', 'green']
    }]
  }
})
</script>

<template lang="pug">
  div
      BarChart(:data="{x:data.map(d=>d.date), y:data.map(d=>d.temperature), title:'Temperature'}")
      BarChart(:data="{x:data.map(d=>d.date), y:data.map(d=>d.pressure - 900), title:'Pressure'}")
      BarChart(:data="{x:data.map(d=>d.date), y:data.map(d=>d.wind_speed), title:'Wind'}")
      BarChart(:data="{x:data.map(d=>d.date), y:data.map(d=>d.wind_direction), title:'Direction'}")


</template>

<style scoped lang="sass">

</style>