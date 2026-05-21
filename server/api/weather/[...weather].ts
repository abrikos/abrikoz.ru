import {Weather} from "#server/models/weather";
import moment from "moment";

const router = createRouter()

router.get('/all', defineEventHandler(async () => {
    return Weather.find({
        createdAt: { $gte: moment().subtract(5, 'days').toDate() }
    }).sort({createdAt: -1})
}))

export default useBase('/api/weather', router.handler)