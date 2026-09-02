export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event) as unknown as IUser

    //const {rows, cols, percent} = await readBody(event)
    const [rows, cols, percent] = [10, 10, 13]
    const field = Array(rows * cols).fill(null).map((_, i) => i).sort(() => .5 - Math.random())
    const minesCount = Math.floor(percent / 100 * cols * rows)
    const mines = field.slice(0, minesCount)
    //const mines = [72, 13, 78, 53, 86, 83, 90, 85, 96, 52, 75, 65, 51]
    return MinesweeperModel.create({rows, cols, mines, percent, user})
})