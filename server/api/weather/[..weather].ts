import {Weather} from "#server/models/weather";

const router = createRouter()

router.get('/all', defineEventHandler(async (event) => {
    return Weather.find()
}))

//Weather.find().then(console.log)
setInterval(async()=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=62.0274078&lon=129.7319787&appid=${process.env.OPENWEATHER_API}&units=metric`
    const res = await fetch(url)
    const data = await res.json()
    await Weather.create({temperature: data.main.temp, pressure: data.main.grnd_level, wind_direction: data.wind.deg, wind_speed: data.wind.speed})
}, 3600000)
export default useBase('/api/weather', router.handler)