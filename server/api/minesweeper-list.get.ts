export default defineEventHandler(async () => {
    return MinesweeperModel.find().select('-mines').sort({createdAt: -1})
})