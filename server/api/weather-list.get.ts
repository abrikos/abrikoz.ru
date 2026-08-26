import moment from "moment";

export default defineEventHandler(async () => {
    return WeatherModel.find({
        createdAt: { $gte: moment().subtract(5, 'days').toDate() }
    }).sort({createdAt: -1})
})