import {getSeoMeta} from "#server/utils/functions";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return getSeoMeta(body.url)

})