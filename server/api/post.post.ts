export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event)
    const body = await readBody(event)
    const {id} = getQuery(event)
    return PostModel.findOneAndUpdate({user, _id:id}, body)
})