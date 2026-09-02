export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event) as unknown as { user: { id: string } }
    if (!user) return
    const {id} = getQuery(event)
    return FiscalModel.updateOne({_id: id, user}, {deleted: true}).catch(console.warn)
})