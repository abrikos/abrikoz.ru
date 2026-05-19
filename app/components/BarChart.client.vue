<script setup lang="ts">
const {data} = defineProps<{ data: { x: string[], y: number[], title: string } }>()
const chartData = computed(() => ({
  chartOptions: {
    title: {text: data.title},
    legend: { position: 'top' },
    xaxis: {
      categories: data.x,
    }
  },
  series: [
    {
      name: 'series-1',
      data: data.y,
    }
  ]
}))
</script>

<template>
  <apexchart type="bar" :options="chartData.chartOptions" :series="chartData.series"></apexchart>
</template>

<style scoped lang="sass">

</style>