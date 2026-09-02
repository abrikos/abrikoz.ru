export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event)
    const { id } = getQuery(event)
    return LinkModel.deleteOne({ _id: id, user }).catch(console.warn)
})