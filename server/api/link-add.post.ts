import {getSeoMeta} from "#server/utils/functions";

//LinkModel.deleteMany().then(console.log)

export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const {user} = await getUserSession(event)
    if (!user) throw createError({status: 403, message: 'Доступ запрещён'})
    const body = await readBody(event)
    const meta = await getSeoMeta(body.url) as any
    return LinkModel.create({user, ...meta})
})