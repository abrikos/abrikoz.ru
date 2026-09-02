export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event) as unknown as IUser
    const {active} = await readBody(event)
    const userFound = await UserModel.findById(user.id).catch(console.warn)
    if (!userFound) return
    userFound.strategies.splice(active, 1)
    userFound.ids.splice(active, 1)
    userFound.active = 0
    if (!userFound.strategies.length) return
    await userFound.save()
    await setUserSession(event, {user: userFound})
})