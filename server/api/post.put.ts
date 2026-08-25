export default defineEventHandler(async (event) => {
    const {user} = await getUserSession(event)
    if (!user) throw createError({status: 403, message: 'Доступ запрещён'})
    const body = await readBody(event)
    console.log('bbbbbbb', body)
    return PostModel.create({user, ...body})
})