export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event)
    if (!user) throw createError({status: 403, message: 'Доступ запрещён'})
    const {id} = getQuery(event)
    const link = await LinkModel.findOne({_id: id, user}).catch(console.warn)
    if(link){
        link.hidden = !link.hidden
        await link.save()
    }
})