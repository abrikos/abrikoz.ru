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
</script>

<template lang="pug">
q-toolbar
  q-toolbar-title {{$t('Minesweeper')}}
div.flex
  //q-select(:options="rowItems" v-model="params.rows" :label="$t('Rows')")
  //q-select(:options="colItems" v-model="params.cols" :label="$t('Cols')")
  //q-select(:options="percentItems" v-model="params.percent" :label="$t('Percent')" density="compact" )
  q-btn(@click="create" color="primary" ) {{$t('Create')}}
div(v-for="item of list" :key="item.id")
  NuxtLink(:to="`/minesweeper-${item.id}`") {{item.createdAt}}
    q-icon(v-if="item.finished === 1"  name="mdi-emoticon-cool-outline" color="green")
    q-icon(v-if="item.finished === -1" name="mdi-emoticon-dead-outline" color="red")
    q-icon(v-if="item.finished === 0" name="mdi-emoticon-neutral-outline")

</template>

<style scoped lang="sass">
.q-field
  width: 150px
</style>
