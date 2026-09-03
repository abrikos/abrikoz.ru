<script setup lang="ts">
type Mark = 'X' | 'O' | ''
type GameState = 'playing' | 'won' | 'lost' | 'draw'

const {t} = useI18n()
const board = ref<Mark[]>(Array(9).fill(''))
const gameState = ref<GameState>('playing')
const currentTurn = ref<'player' | 'computer'>('player')
const playerScore = ref(0)
const computerScore = ref(0)
const draws = ref(0)
const winningCells = ref<number[]>([])
let computerTimer: ReturnType<typeof setTimeout> | undefined

const winningLines: readonly (readonly [number, number, number])[] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

const statusText = computed(() => {
  if (gameState.value === 'won') return t('You won this round!')
  if (gameState.value === 'lost') return t('Computer won this round.')
  if (gameState.value === 'draw') return t('It is a draw.')
  return currentTurn.value === 'player' ? t('Your turn — make a move.') : t('Computer is thinking…')
})

function getWinner(cells: Mark[]) {
  return winningLines.find(([a, b, c]) => cells[a] && cells[a] === cells[b] && cells[a] === cells[c])
}

function finishRound() {
  const winner = getWinner(board.value)
  if (winner) {
    winningCells.value = [...winner]
    if (board.value[winner[0]] === 'X') {
      gameState.value = 'won'
      playerScore.value++
    } else {
      gameState.value = 'lost'
      computerScore.value++
    }
  } else if (board.value.every(Boolean)) {
    gameState.value = 'draw'
    draws.value++
  }
}

function makeMove(index: number, mark: 'X' | 'O') {
  if (board.value[index] || gameState.value !== 'playing') return
  board.value[index] = mark
  finishRound()
}

function computerMove() {
  if (gameState.value !== 'playing') return
  const available = board.value.map((cell, index) => cell ? -1 : index).filter(index => index !== -1)
  if (!available.length) return

  const winningMove = findTacticalMove('O') ?? findTacticalMove('X')
  const preferred = winningMove ?? (board.value[4] ? undefined : 4)
  const corners = available.filter(index => [0, 2, 6, 8].includes(index))
  const randomMoves = corners.length ? corners : available
  const index = preferred ?? randomMoves[Math.floor(Math.random() * randomMoves.length)]
  if (index === undefined) return

  makeMove(index, 'O')
  if (gameState.value === 'playing') currentTurn.value = 'player'
}

function findTacticalMove(mark: 'X' | 'O') {
  return winningLines
    .map(line => {
      const marks = line.map(index => board.value[index])
      const emptyCell = line.find(index => board.value[index] === '')
      return marks.filter(cell => cell === mark).length === 2 ? emptyCell : undefined
    })
    .find(index => index !== undefined)
}

function play(index: number) {
  if (currentTurn.value !== 'player' || gameState.value !== 'playing') return
  makeMove(index, 'X')
  if (gameState.value === 'playing') {
    currentTurn.value = 'computer'
    computerTimer = setTimeout(computerMove, 420)
  }
}

function newRound() {
  if (computerTimer) clearTimeout(computerTimer)
  board.value = Array(9).fill('')
  gameState.value = 'playing'
  currentTurn.value = 'player'
  winningCells.value = []
}

function resetMatch() {
  playerScore.value = 0
  computerScore.value = 0
  draws.value = 0
  newRound()
}

function cellLabel(index: number) {
  return board.value[index]
    ? t('Cell {number}: {mark}', {number: index + 1, mark: board.value[index]})
    : t('Empty cell {number}', {number: index + 1})
}

onBeforeUnmount(() => {
  if (computerTimer) clearTimeout(computerTimer)
})

useHead({
  title: () => `${t('Tic-Tac-Toe')} — Abrikos HP`,
  meta: [{name: 'description', content: t('Play Tic-Tac-Toe against the computer')}]
})
</script>

<template lang="pug">
  main.tic-tac-toe
    header.game-header
      div
        p.eyebrow {{$t('Games')}}
        h1 {{$t('Tic-Tac-Toe')}}
        p.subtitle {{$t('A quick match of Xs and Os against the computer.')}}
      q-btn(color="primary" icon="mdi-refresh" :label="$t('New round')" @click="newRound")

    section.scoreboard(:aria-label="$t('Score')")
      div.score-card.score-card--player
        span.score-mark X
        div
          span.score-label {{$t('You')}}
          strong {{playerScore}}
      div.score-card.score-card--draw
        span.score-mark —
        div
          span.score-label {{$t('Draws')}}
          strong {{draws}}
      div.score-card.score-card--computer
        span.score-mark O
        div
          span.score-label {{$t('Computer')}}
          strong {{computerScore}}

    section.status-card(:class="`status-card--${gameState}`")
      div.status-icon
        q-icon(:name="gameState === 'won' ? 'mdi-trophy' : gameState === 'lost' ? 'mdi-robot-outline' : gameState === 'draw' ? 'mdi-handshake-outline' : 'mdi-cursor-default-click-outline'" size="24px")
      div
        strong {{statusText}}
        p {{$t('X goes first · choose any empty square')}}

    section.board-panel
      div.board-shell
        div.board(:aria-label="$t('Tic-Tac-Toe board')")
          button.cell(
            v-for="(cell, index) in board"
            :key="index"
            type="button"
            :class="{'cell--x': cell === 'X', 'cell--o': cell === 'O', 'cell--winner': winningCells.includes(index)}"
            :disabled="Boolean(cell) || gameState !== 'playing' || currentTurn !== 'player'"
            :aria-label="cellLabel(index)"
            @click="play(index)"
          ) {{cell}}

    footer.game-footer
      span
        i.legend-dot.legend-dot--x
        | {{$t('You are X')}}
      span
        i.legend-dot.legend-dot--o
        | {{$t('Computer is O')}}
      q-btn(flat dense color="grey-7" :label="$t('Reset score')" @click="resetMatch")
</template>

<style scoped lang="sass">
.tic-tac-toe
  max-width: 720px
  margin: 0 auto
  padding: 38px 24px 56px
  color: #17233d

.game-header
  display: flex
  align-items: flex-end
  justify-content: space-between
  gap: 24px
  margin-bottom: 26px

.eyebrow
  margin: 0 0 6px
  color: #e8683b
  font-size: 12px
  font-weight: 800
  letter-spacing: .14em
  text-transform: uppercase

h1
  margin: 0
  font-size: clamp(30px, 4vw, 46px)
  font-weight: 800
  letter-spacing: -.04em

.subtitle
  margin: 8px 0 0
  color: #71809a

.scoreboard
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 12px
  margin-bottom: 18px

.score-card
  display: flex
  align-items: center
  gap: 12px
  padding: 14px 16px
  border: 1px solid #e0e7f0
  border-radius: 14px
  background: white

.score-mark
  display: grid
  width: 34px
  height: 34px
  place-items: center
  border-radius: 10px
  background: #edf5fc
  color: #5484b5
  font-size: 18px
  font-weight: 800

.score-card--computer .score-mark
  background: #fff0ea
  color: #e8683b

.score-card--draw .score-mark
  background: #f2f3f6
  color: #71809a

.score-label
  display: block
  color: #8290a7
  font-size: 11px

.score-card strong
  display: block
  margin-top: 1px
  font-size: 20px

.status-card
  display: flex
  align-items: center
  gap: 14px
  margin-bottom: 22px
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

.status-card--draw
  border-color: #d7d9df
  background: #f5f5f7

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

.board-panel
  padding: clamp(18px, 5vw, 34px)
  border: 1px solid #e0e7f0
  border-radius: 20px
  background: white
  box-shadow: 0 12px 35px rgba(33, 53, 85, .07)

.board-shell
  max-width: 500px
  margin: auto

.board
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 10px
  aspect-ratio: 1

.cell
  display: grid
  place-items: center
  padding: 0
  border: 2px solid #d8e4f0
  border-radius: 14px
  background: #f7faff
  color: #5484b5
  cursor: pointer
  font-size: clamp(48px, 13vw, 92px)
  font-weight: 800
  line-height: 1
  transition: transform .12s, border-color .12s, background .12s

.cell:not(:disabled):hover
  border-color: #e8683b
  background: #fff5f1
  transform: scale(1.03)

.cell--o
  color: #e8683b

.cell--winner
  border-color: #f0b04d
  background: #fff8e8
  box-shadow: 0 0 0 3px rgba(240, 176, 77, .16)

.game-footer
  display: flex
  align-items: center
  justify-content: center
  gap: 20px
  margin-top: 18px
  color: #71809a
  font-size: 12px

.game-footer span
  display: flex
  align-items: center
  gap: 6px

.legend-dot
  width: 9px
  height: 9px
  border-radius: 50%

.legend-dot--x
  background: #5484b5

.legend-dot--o
  background: #e8683b

@media (max-width: 600px)
  .tic-tac-toe
    padding: 24px 12px 40px

  .game-header
    align-items: flex-start
    flex-direction: column
    gap: 16px

  .game-header .q-btn
    align-self: stretch

  .scoreboard
    gap: 7px

  .score-card
    justify-content: center
    padding: 10px 5px

  .score-mark
    width: 29px
    height: 29px

  .score-label
    font-size: 10px

  .board
    gap: 7px

  .cell
    border-radius: 10px

  .game-footer
    flex-wrap: wrap
    gap: 10px 14px
</style>
