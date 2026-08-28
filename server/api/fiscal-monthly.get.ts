import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
    const {user} = await getUserSession(event) as unknown as {user:{id:string}}
    if (!user) throw createError({statusCode: 403, message: event.context.$t('Access denied'),})
    return FiscalModel.aggregate([
        {$match: {user: new mongoose.Types.ObjectId(user.id), deleted:{$ne:true}}},
        //{ "$unwind": "$goods" },
        {
            $group: {
                _id: {
                    year: {$year: "$dateTime"},
                    month: {$month: "$dateTime"},
                },
                testSum:{$sum:"$totalSum"},
            }
        },
        {
            $project:{
                year: "$_id.year",
                month: "$_id.month",
                totalSum: {$divide: ["$testSum", 100]},
            }
        },
        {$sort: {_id: -1}}
    ])
})