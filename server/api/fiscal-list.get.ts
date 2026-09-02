//FiscalModel.find().then(console.log);
export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event)
    if (!user) return []
    return FiscalModel.find({user, deleted:{$ne:true}}).sort({dateTime: -1})
})