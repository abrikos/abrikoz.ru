export default defineEventHandler(async () => {
    return LinkModel.find({hidden:false})
})