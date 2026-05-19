import {defineMongooseModel} from '#nuxt/mongoose'
import moment from 'moment'

interface IWeather {
    temperature: number;
    pressure: number;
    wind_speed: number;
    wind_direction: number;
}

interface ITimestamps {
    createdAt: Date;
    updatedAt: Date;
}

export const Weather = defineMongooseModel<IWeather & ITimestamps>({
    name: 'Weather',
    schema: {
        temperature: {type: Number, required: true},
        pressure: {type: Number, required: true},
        wind_speed: {type: Number},
        wind_direction: {type: Number},
    },
    options: {
        timestamps: true,
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    },
    hooks(schema) {
        schema.virtual('date').get(function () {
            return  moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
        })
    }
})
