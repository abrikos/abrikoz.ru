<script setup lang="ts">

const router = useRouter()
const params = ref({rows: 10, cols: 10, percent: 13})
const list = await useNuxtApp().$GET(`/minesweeper-list`)

async function create() {
  const game = await useNuxtApp().$PUT('/minesweeper', params.value)
  await router.push(`/minesweeper-${game?.id}`)
}

const rowItems = Array(100).fill(null).map((_, i) => i)
const colItems = Array(100).fill(null).map((_, i) => i)
const percentItems = [5, 13, 20]

const columns = [
  {label: $t('Date'), field: 'date', name: ''},
  {label: $t('Status'), field: statusField, name: ''},
  {label: $t('Turns'), field: 'turn', name: ''},
  {label: $t('Time'), field: timeField, name: ''},
]

function rowClass(item: any) {
  return item.finished === 1 ? 'bg-green' : item.finished === -1 ? 'bg-red' : ''
}
function statusField(item: any) {
  return item.finished === 1 ? '\u{1F60A}' : item.finished === -1 ? '\u{1F922}' : ''
}

function timeField(row: any) {
  return `${row.playTime.days}d ${row.playTime.hours}:${row.playTime.minutes}`
}

function rowClick(e:any, item: any) {
  navigateTo(`/minesweeper-${item.id}`)
}

</script>

<template lang="pug">
  q-table(:columns="columns" :rows="list" :title="$t('Minesweeper list')" :table-row-class-fn="rowClass" @row-click="rowClick")
    template(v-slot:top)
      q-toolbar
        q-toolbar-title {{$t('Minesweeper list')}} {{ '\u{1F60A}' }}
        q-separator
        q-btn(@click="create" color="primary" ) {{$t('Create')}}
  //table
    tbody
      tr
        th.text-left {{$t('Date')}}
        th {{$t('Status')}}
        th {{$t('Turns')}}
        th {{$t('Time')}}
      tr(v-for="item of list" :key="item.id" :class="item.finished === 1 ? 'bg-green' : item.finished === -1 ? 'bg-red' : '' ")
        td
          NuxtLink(:to="`/minesweeper-${item.id}`") {{item.date}}
        td.text-center
          q-icon(v-if="item.finished === 1"  name="mdi-emoticon-cool-outline")
            q-tooltip.bg-green(anchor="top right") {{$t('Win')}}
          q-icon(v-if="item.finished === -1" name="mdi-emoticon-dead-outline")
            q-tooltip.bg-red(anchor="top right") {{$t('Game over')}}
          q-icon(v-if="item.finished === 0" name="mdi-emoticon-neutral-outline")
            q-tooltip(anchor="top right") {{$t('Played')}}
        td.text-center {{item.turn}}
        td.text-right {{item.playTime.days}}d {{item.playTime.hours}}:{{item.playTime.minutes}}

</template>

<style scoped lang="sass">
.q-field
  width: 150px
</style>
