export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event) as unknown as IUser
    const { id } = getQuery(event)
    if(user?.admin){
        return LinkModel.deleteOne({ _id: id}).catch(console.warn)
    }
    return LinkModel.deleteOne({ _id: id, user }).catch(console.warn)
})