import {Weather} from "#server/models/weather";
import moment from "moment";

const router = createRouter()

router.get('/all', defineEventHandler(async () => {
    return Weather.find({
        createdAt: { $gte: moment().subtract(5, 'days').toDate() }
    }).sort({createdAt: -1})
}))

async function fetchWeather(){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=62.0274078&lon=129.7319787&appid=${process.env.OPENWEATHER_API}&units=metric`
    const res = await fetch(url)
    const data = await res.json()
    const w = await Weather.create({temperature: data.main.temp, pressure: data.main.grnd_level, wind_direction: data.wind.deg, wind_speed: data.wind.speed})
    console.log(w)
    await Weather.deleteMany({createdAt: {$lte: moment().subtract(15, 'days').toDate()}})
    return [1,2,3]
}

router.get('/fetch', defineEventHandler(fetchWeather))
//fetchWeather()
//Weather.find().then(console.log)
//setInterval(fetchWeather, 3600000)
export default useBase('/api/weather', router.handler)