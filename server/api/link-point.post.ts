export default defineEventHandler(async (event) => {
    const {user} = await getUserSession(event)
    if (!user) throw createError({status: 403, message: 'Доступ запрещён'})
    const body = await readBody(event)
    console.log(body)
    return LinkModel.updateOne({user, _id: body.id}, {coordinates: body.coordinates})
})