export default defineEventHandler(async () => {
    return PostModel.find({published: true})
})