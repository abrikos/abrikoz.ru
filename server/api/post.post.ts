export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event) as unknown as IUser
    const body = await readBody(event)
    const {id} = getQuery(event)
    if(user?.admin){
        return PostModel.findByIdAndUpdate(id, body)
    }
    return PostModel.findOneAndUpdate({user, _id:id}, body)
})