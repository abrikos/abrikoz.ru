//FiscalModel.find().then(console.log);
export default defineEventHandler(async (event) => {
    const {user} = await getUserSession(event)
    if (!user) throw createError({statusCode: 403, message: event.context.$t('Access denied'),})
    return FiscalModel.find({user, deleted:{$ne:true}}).sort({dateTime: -1})
})