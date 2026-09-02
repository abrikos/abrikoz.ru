<script setup lang="ts">
import mine from '../../public/mine.svg'
import type {IMinesweeper} from "#server/models/minesweeper.model.ts";

const {user} = useUserSession()
const mineUrl = `url("${mine}")`
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const rowsArray = ref()
const colsArray = ref()
const fieldSize = ref()
const game = ref()

async function load() {
  game.value = await useNuxtApp().$GET(`/minesweeper?id=${route.params.id}`)
  rowsArray.value = Array(game.value.rows).fill(null).map((_, i) => i)
  colsArray.value = Array(game.value.cols).fill(null).map((_, i) => i)
  fieldSize.value = cellSize.value * game.value.rows + fieldBorder * 2 + fieldPadding * 2
}

onMounted(load)

const cellSize = ref(40)
const fieldBorder = 4
const fieldPadding = 4


function idx(row: number, col: number) {
  return row * game.value.rows + col
}

function cellClass(row: number, col: number) {
  if (game.value.mines.includes(idx(row, col))) {
    if (game.value.finished === -1) return 'mine-exploded'
    if (game.value.finished === 1) return 'playable mine-saved'
    return 'cheat'
  }
  if (game.value.turns.includes(idx(row, col))) return 'turn'
  return 'playable'
}

const colors = ['', 'red', 'green', 'blue', 'yellow', 'brown', 'cyan', 'magenta', 'pink']

function cellStyle(row: number, col: number) {
  const count = game.value.counts.find((i: [number, number]) => i[0] === idx(row, col))
  const color = count ? colors[count[1]] : ''
  const width = cellSize.value + 'px'
  const height = cellSize.value + 'px'
  return {color, width, height}
}

const timer = ref()
const time = ref(0)

async function cellClick(row: number, col: number) {
  if (game.value.finished) {
    return
  }
  if (game.value.turns.includes(idx(row, col))) return
  if (!timer.value) {
    timer.value = setInterval(() => {
      time.value++
    }, 1000)
  }
  const turn = await useNuxtApp().$POST(`/minesweeper?id=${game.value.id}`, {idx: idx(row, col)}) as unknown as IMinesweeper
  if (turn?.finished) {
    clearInterval(timer.value)
  }
  await load()

}

async function restart() {
  const newGame = await useNuxtApp().$PUT(`/minesweeper`, game.value) as unknown as IMinesweeper
  await router.push(`/minesweeper-${newGame.id}`)
}

function getCount(row: number, col: number) {
  const i = idx(row, col)
  const found = game.value.counts.find((c: [number, number]) => c[0] === i)
  return found && found[1]
}

const smileIcon = computed(() => {
  return game.value.finished === 1 ? 'mdi-emoticon-cool-outline' : game.value.finished === -1 ? 'mdi-emoticon-dead-outline' : 'mdi-emoticon-neutral-outline'
})

</script>

<template lang="pug">
  q-card(v-if="game" style="width:500px")
    q-toolbar
      q-toolbar-title {{$t('Minesweeper')}} {{game.createdAt}}
    q-card-section.flex.justify-center
      div#field(:style="{width:fieldSize+'px', padding: fieldPadding+'px'}")
        div#header(:style="{borderWidth:fieldBorder+'px'}")
          div.counter {{time}}
          div#smile(@click="restart")
            //v-btn(:icon="smileIcon" size="x-small" color="yellow" )
            q-icon(color="black" :name="smileIcon")
              q-tooltip {{$t('Restart game')}}
          div.counter {{game.turn}}
        div#field-border(:style="{borderWidth:fieldBorder+'px'}")
          div#miner
            div.row(v-for="row of rowsArray" :key="row")
              div.cell(v-for="col of colsArray" :key="col" @click="cellClick(row,col)" :class="cellClass(row,col)" :style="cellStyle(row,col)") {{getCount(row,col)}}
      div.text-red(v-if="game.finished===-1") {{$t('Game over')}}
      div.text-green(v-if="game.finished===1") {{$t('Win')}}

</template>

<style scoped lang="sass">
#field
  background-color: silver

  #header
    display: flex
    justify-content: space-between
    align-items: center
    border-style: solid
    border-left-color: gray
    border-top-color: gray
    margin-bottom: 10px
    padding: 5px

    #smile
      cursor: pointer
      width: 50px
      padding: 1px
      display: flex
      justify-content: center
      background-color: yellow
      border-radius: 12px
      border: 1px solid gray

    .counter
      overflow: hidden
      width: 60px
      text-align: right
      padding: 4px
      background-color: black
      color: red
      font-weight: bolder

  #field-border
    border-style: solid
    border-left-color: gray
    border-top-color: gray

#miner
  .row
    display: flex
    flex-wrap: wrap

    .cell
      background-color: silver
      display: flex
      justify-content: center
      align-items: center
      font-weight: bolder

    .turn
      border: 1px solid gray

    .cheat
      border: 1px solid red
    //opacity: .2
    .mine-exploded
      background-color: red
      border: 1px solid gray
      background-image: v-bind(mineUrl)
      background-size: 80%
      background-position: center

    .playable
      border-style: solid
      border-width: 3px
      border-top-color: white
      border-right-color: gray
      border-bottom-color: gray
      border-left-color: white

    .mine-saved
      background-image: v-bind('mineUrl')
      background-size: 80%
      background-position: center

</style>
