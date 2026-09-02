export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event) as unknown as IUser
    const {active} = await readBody(event)
    const userFound = await UserModel.findByIdAndUpdate(user.id, {active},  { returnDocument: 'after' }).catch(console.warn)
    if (!userFound) return
    await setUserSession(event, {user: userFound})
})