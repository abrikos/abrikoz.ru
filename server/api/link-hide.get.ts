export default defineEventHandler(async (event) => {
    const {user} = await getUserSession(event)
    if (!user) throw createError({status: 403, message: 'Доступ запрещён'})
    const {id} = getQuery(event)
    //const x = await LinkModel.findOneAndUpdate({_id: id, user}, [{$set: {hidden: {$not: 'hidden'}}}], {updatePipeline: true})
    const link = await LinkModel.findOne({_id: id, user})
    if(link){
        link.hidden = !link.hidden
        await link.save()
    }
})