import {WeatherModel} from "#server/models/weather.model";
import moment from "moment";


export default defineEventHandler(async (event)=>{
    const query = getQuery(event)
    if(query.session!== process.env.NUXT_SESSION_PASSWORD) throw createError({status: 406, message: 'Wrong data'})
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=62.0274078&lon=129.7319787&appid=${process.env.OPENWEATHER_API}&units=metric`
    const res = await fetch(url)
    const data = await res.json()
    WeatherModel.create({temperature: data.main.temp, pressure: data.main.grnd_level, wind_direction: data.wind.deg, wind_speed: data.wind.speed})
    WeatherModel.deleteMany({createdAt: {$lte: moment().subtract(15, 'days').toDate()}})
})