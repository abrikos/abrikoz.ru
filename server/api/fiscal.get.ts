FiscalModel.findOne({_id:'6a913ff4e9af160f357bab1c'}).then(console.log)
export default defineEventHandler(async (event) => {
    const {user} = await getUserSession(event) as unknown as {user:{id:string}}
    if (!user) throw createError({statusCode: 403, message: event.context.$t('Access denied'),})
    const {id} = getQuery(event)
    return FiscalModel.findOne({_id:id, user}).populate('goods')
})