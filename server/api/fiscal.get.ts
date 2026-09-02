export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event) as unknown as {user:{id:string}}
    if (!user) return
    const {id} = getQuery(event)
    return FiscalModel.findOne({_id:id, user}).populate('goods').catch(console.warn)
})