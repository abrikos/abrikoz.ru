export default defineEventHandler(async () => {
    return LinkModel.find().populate('user')
})