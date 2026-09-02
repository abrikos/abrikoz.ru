import {minesweeperCheckCell} from "#server/utils/functions.ts";

export default defineEventHandler(async (event) => {
    //await requireUserSession(event)
    const {id} = getQuery(event)

    const {idx} = await readBody(event)
    const game = await MinesweeperModel.findById(id)
    if (!game) throw createError({status: 406, message: 'Game not found'})
    if (game.finished) throw createError({status: 406, message: 'Game is over'})
    minesweeperCheckCell(game, idx)
    game.turn++
    await game.save()
    if (game.finished === 1) {
        // const prize = await utils.ethPrice()
        // await utils.sendEth(1 / prize, user.ethAddress)
    }
    return game
})