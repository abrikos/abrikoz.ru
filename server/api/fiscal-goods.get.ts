//PostModel.find({published:true}).populate('user').then(console.log);
export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event)
    return GoodModel.find({user, deleted:{$ne:true}}).sort({name: 1}).populate("fiscal");
})