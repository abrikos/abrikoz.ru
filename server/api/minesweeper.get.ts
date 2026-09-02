export default defineEventHandler(async (event) => {
    const {id} = getQuery(event)
    const game = await MinesweeperModel.findById(id)
    if (!game) throw createError({statusCode: 406, message: 'Game not found'})
    if (!process.dev && !game.finished) {
        game.mines = []
    }
    return game

})