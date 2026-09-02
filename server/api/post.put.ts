export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event)
    const body = await readBody(event)
    return PostModel.create({user, ...body})
})