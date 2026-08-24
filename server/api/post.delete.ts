export default defineEventHandler(async (event) => {
    const {user} = await getUserSession(event)
    if (!user) throw createError({status: 403, message: 'Доступ запрещён'})
    const {id} = getQuery(event)
    return PostModel.deleteOne({_id: id, user})
})