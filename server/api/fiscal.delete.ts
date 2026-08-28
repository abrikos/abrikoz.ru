export default defineEventHandler(async (event) => {
    const {user} = await getUserSession(event) as unknown as { user: { id: string } }
    if (!user) throw createError({statusCode: 403, message: event.context.$t('Access denied'),})
    const {id} = getQuery(event)
    return FiscalModel.updateOne({_id: id, user}, {deleted: true})
})