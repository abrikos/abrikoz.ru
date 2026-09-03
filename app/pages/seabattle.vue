<script setup lang="ts">
type Cell = 'empty' | 'ship' | 'hit' | 'miss'
type Board = Cell[][]

const {t} = useI18n()
const size = 10
const fleet = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
const letters = 'ABCDEFGHIJ'.split('')

const playerBoard = ref<Board>([])
const enemyBoard = ref<Board>([])
const enemyShots = ref<Set<string>>(new Set())
const playerShots = ref<Set<string>>(new Set())
const turn = ref<'player' | 'computer'>('player')
const gameState = ref<'playing' | 'won' | 'lost'>('playing')
const lastMove = ref('')

function newBoard(): Board {
  return Array.from({length: size}, () => Array<Cell>(size).fill('empty'))
}

function canPlace(board: Board, row: number, col: number, length: number, horizontal: boolean): boolean {
  for (let i = 0; i < length; i++) {
    const currentRow = row + (horizontal ? 0 : i)
    const currentCol = col + (horizontal ? i : 0)
    const rowCells = board[currentRow]
    if (!rowCells || currentCol >= size || rowCells[currentCol] !== 'empty') return false
  }
  return true
}

function placeFleet(): Board {
  const board = newBoard()
  for (const length of fleet) {
    let placed = false
    while (!placed) {
      const horizontal = Math.random() > 0.5
      const row = Math.floor(Math.random() * size)
      const col = Math.floor(Math.random() * size)
      if (!canPlace(board, row, col, length, horizontal)) continue
      for (let i = 0; i < length; i++) {
        const rowCells = board[row + (horizontal ? 0 : i)]
        const currentCol = col + (horizontal ? i : 0)
        if (rowCells && currentCol < size) rowCells[currentCol] = 'ship'
      }
      placed = true
    }
  }
  return board
}

function key(row: number, col: number) {
  return `${row}-${col}`
}

function remainingShips(board: Board) {
  return board.flat().filter(cell => cell === 'ship').length
}

function formatCell(row: number, col: number): string {
  return `${letters[col] ?? '?'}${row + 1}`
}

function shoot(row: number, col: number) {
  if (gameState.value !== 'playing' || turn.value !== 'player' || playerShots.value.has(key(row, col))) return

  playerShots.value.add(key(row, col))
  const rowCells = enemyBoard.value[row]
  const cell = rowCells?.[col]
  if (cell === undefined || rowCells === undefined) return
  rowCells[col] = cell === 'ship' ? 'hit' : 'miss'
  lastMove.value = t('Shot result', {
    cell: formatCell(row, col),
    result: cell === 'ship' ? t('Hit') : t('Miss')
  })

  if (remainingShips(enemyBoard.value) === 0) {
    gameState.value = 'won'
    return
  }

  turn.value = 'computer'
  window.setTimeout(computerTurn, 550)
}

function computerTurn() {
  if (gameState.value !== 'playing') return
  let row = 0
  let col = 0
  do {
    row = Math.floor(Math.random() * size)
    col = Math.floor(Math.random() * size)
  } while (enemyShots.value.has(key(row, col)))

  enemyShots.value.add(key(row, col))
  const rowCells = playerBoard.value[row]
  const cell = rowCells?.[col]
  if (cell === undefined || rowCells === undefined) return
  rowCells[col] = cell === 'ship' ? 'hit' : 'miss'
  lastMove.value = t('Computer shot result', {
    cell: formatCell(row, col),
    result: cell === 'ship' ? t('Hit') : t('Miss')
  })

  if (remainingShips(playerBoard.value) === 0) {
    gameState.value = 'lost'
    return
  }
  turn.value = 'player'
}

function resetGame() {
  playerBoard.value = placeFleet()
  enemyBoard.value = placeFleet()
  enemyShots.value = new Set()
  playerShots.value = new Set()
  turn.value = 'player'
  gameState.value = 'playing'
  lastMove.value = t('Your turn — choose a target')
}

function cellClass(cell: Cell, hidden: boolean) {
  return {
    'cell--ship': cell === 'ship' && !hidden,
    'cell--hit': cell === 'hit',
    'cell--miss': cell === 'miss',
    'cell--target': hidden && cell === 'empty'
  }
}

onMounted(resetGame)

useHead({
  title: () => `${t('Sea Battle')} — Abrikos HP`,
  meta: [{name: 'description', content: t('Play Sea Battle against the computer')}]
})
</script>

<template lang="pug">
  main.sea-battle
    header.game-header
      div
        p.eyebrow {{$t('Games')}}
        h1 {{$t('Sea Battle')}}
        p.subtitle {{$t('Sink the fleet before the computer finds yours.')}}
      q-btn(color="primary" icon="mdi-refresh" :label="$t('New game')" @click="resetGame")

    section.status-card(:class="`status-card--${gameState}`")
      div.status-icon
        q-icon(:name="gameState === 'won' ? 'mdi-trophy' : gameState === 'lost' ? 'mdi-skull-crossbones-outline' : 'mdi-crosshairs-gps'" size="24px")
      div
        strong(v-if="gameState === 'playing'") {{turn === 'player' ? $t('Your turn') : $t('Computer is thinking…')}}
        strong(v-else-if="gameState === 'won'") {{$t('Victory! The fleet is sunk.')}}
        strong(v-else) {{$t('Fleet lost. Better luck next time.')}}
        p {{lastMove}}

    section.boards
      div.board-panel
        div.board-title
          div
            h2 {{$t('Your fleet')}}
            span {{remainingShips(playerBoard)}} {{$t('ship cells remaining')}}
          q-badge(color="blue-grey-8") {{$t('YOU')}}
        div.board-wrap
          div.coordinate-row
            span
            span(v-for="letter in letters" :key="letter") {{letter}}
          div.board-grid
            div.coordinate-column
              span(v-for="row in size" :key="row") {{row}}
            div.grid
              button.cell(
                v-for="(cell, index) in playerBoard.flat()"
                :key="`player-${index}`"
                type="button"
                :class="cellClass(cell, false)"
                :aria-label="$t('Your fleet cell', {cell: formatCell(Math.floor(index / size), index % size)})"
                disabled
              )

      div.board-panel.board-panel--enemy
        div.board-title
          div
            h2 {{$t('Enemy waters')}}
            span {{playerShots.size}} {{$t('shots fired')}}
          q-badge(color="deep-orange-8") {{$t('TARGET')}}
        div.board-wrap
          div.coordinate-row
            span
            span(v-for="letter in letters" :key="letter") {{letter}}
          div.board-grid
            div.coordinate-column
              span(v-for="row in size" :key="row") {{row}}
            div.grid
              button.cell(
                v-for="(cell, index) in enemyBoard.flat()"
                :key="`enemy-${index}`"
                type="button"
                :class="cellClass(cell, true)"
                :disabled="gameState !== 'playing' || turn !== 'player' || playerShots.has(key(Math.floor(index / size), index % size))"
                :aria-label="$t('Fire at cell', {cell: formatCell(Math.floor(index / size), index % size)})"
                @click="shoot(Math.floor(index / size), index % size)"
              )

    footer.legend
      span.legend-item
        i.legend-dot.legend-dot--ship
        | {{$t('Your ship')}}
      span.legend-item
        i.legend-dot.legend-dot--hit
        | {{$t('Hit')}}
      span.legend-item
        i.legend-dot.legend-dot--miss
        | {{$t('Miss')}}
</template>

<style scoped lang="sass">
.sea-battle
  max-width: 1180px
  margin: 0 auto
  padding: 38px 24px 56px
  color: #17233d

.game-header
  display: flex
  align-items: flex-end
  justify-content: space-between
  gap: 24px
  margin-bottom: 28px

.eyebrow
  margin: 0 0 6px
  color: #e8683b
  font-size: 12px
  font-weight: 800
  letter-spacing: .14em
  text-transform: uppercase

h1, h2
  margin: 0
  font-weight: 800

h1
  font-size: clamp(30px, 4vw, 46px)
  letter-spacing: -.04em

.subtitle
  margin: 8px 0 0
  color: #71809a

.reset-btn
  border-radius: 10px

.status-card
  display: flex
  align-items: center
  gap: 14px
  margin-bottom: 30px
  padding: 15px 18px
  border: 1px solid #dce5f1
  border-radius: 14px
  background: #f5f8fc

.status-card--won
  border-color: #a6dbbd
  background: #edf9f1
  color: #17663a

.status-card--lost
  border-color: #f2b6ac
  background: #fff2f0
  color: #a6382b

.status-icon
  display: grid
  width: 42px
  height: 42px
  place-items: center
  border-radius: 11px
  background: white

.status-card strong
  font-size: 16px

.status-card p
  margin: 3px 0 0
  opacity: .72
  font-size: 13px

.boards
  display: grid
  grid-template-columns: repeat(2, minmax(0, 1fr))
  gap: 26px

.board-panel
  min-width: 0
  padding: 20px
  border: 1px solid #e0e7f0
  border-radius: 18px
  background: white
  box-shadow: 0 12px 35px rgba(33, 53, 85, .06)

.board-title
  display: flex
  align-items: center
  justify-content: space-between
  margin-bottom: 18px

.board-title h2
  font-size: 19px

.board-title span
  display: block
  margin-top: 3px
  color: #8290a7
  font-size: 12px

.board-title .q-badge
  padding: 6px 9px
  border-radius: 7px
  font-size: 10px
  letter-spacing: .08em

.board-wrap
  width: 100%
  max-width: 480px
  margin: auto

.coordinate-row
  display: grid
  grid-template-columns: 22px repeat(10, 1fr)
  margin-bottom: 5px
  color: #8a98ac
  font-size: 11px
  font-weight: 700
  text-align: center

.board-grid
  display: grid
  grid-template-columns: 22px 1fr
  gap: 5px

.coordinate-column
  display: grid
  grid-template-rows: repeat(10, 1fr)
  color: #8a98ac
  font-size: 11px
  font-weight: 700
  text-align: center

.coordinate-column span
  display: grid
  place-items: center

.grid
  display: grid
  grid-template-columns: repeat(10, 1fr)
  gap: 3px
  aspect-ratio: 1

.cell
  position: relative
  min-width: 0
  padding: 0
  border: 1px solid #c7d9ed
  border-radius: 4px
  background: #edf5fc
  cursor: crosshair
  transition: transform .12s, background .12s, border-color .12s

.board-panel--enemy .cell:not(:disabled):hover
  z-index: 1
  border-color: #e8683b
  background: #ffe8df
  transform: scale(1.08)

.cell--ship
  border-color: #5484b5
  background: #6f9cc8

.cell--hit, .cell--miss
  cursor: default

.cell--hit
  border-color: #d34d3d
  background: #e8683b

.cell--hit::after
  content: ''
  position: absolute
  inset: 27%
  border-radius: 50%
  background: white

.cell--miss
  border-color: #a9bfd8
  background: #dbe8f4

.cell--miss::after
  content: ''
  position: absolute
  width: 34%
  height: 34%
  top: 33%
  left: 33%
  border: 2px solid #7f9bb8
  border-radius: 50%

.legend
  display: flex
  justify-content: center
  gap: 22px
  margin-top: 22px
  color: #71809a
  font-size: 12px

.legend-item
  display: flex
  align-items: center
  gap: 6px

.legend-dot
  width: 10px
  height: 10px
  border-radius: 3px

.legend-dot--ship
  background: #6f9cc8

.legend-dot--hit
  background: #e8683b

.legend-dot--miss
  background: #dbe8f4

@media (max-width: 760px)
  .sea-battle
    padding: 24px 12px 40px

  .game-header
    align-items: flex-start
    flex-direction: column
    margin-bottom: 20px

  .reset-btn
    align-self: stretch

  .boards
    grid-template-columns: 1fr
    gap: 16px

  .board-panel
    padding: 14px

  .legend
    gap: 12px
  .legend-item
    font-size: 11px
</style>
