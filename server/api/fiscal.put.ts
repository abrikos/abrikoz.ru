export default defineEventHandler(async (event) => {
    const {user} = await getUserSession(event) as unknown as {user:{id:string}}
    if (!user) throw createError({statusCode: 403, message: event.context.$t('Access denied'),})
    let formData = await readMultipartFormData(event)
    if (formData?.length) {
        const json = JSON.parse(formData[0].data.toString())
        for (const checkImported of json) {
            const checkData = checkImported.ticket.document.receipt;
            checkData.owner = checkData.user;
            checkData.user = user;
            try {
                const check = await FiscalModel.updateOne({fiscalDocumentNumber: checkData.fiscalDocumentNumber, user}, checkData, {upsert: true});
                if (check.upsertedId) {
                    for (const item of checkData.items) {
                        item.fiscal = check.upsertedId;
                        item.user = user
                        await GoodModel.create(item)
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
})