import {defineMongooseModel} from '#nuxt/mongoose'
import moment from 'moment'

export const WeatherModel = defineMongooseModel({
    name: 'weather',
    schema: {
        temperature: {type: Number, required: true},
        pressure: {type: Number, required: true},
        wind_speed: {type: Number},
        wind_direction: {type: Number},
        createdAt: Date as any
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
            return  moment(this.createdAt as any).format('YYYY-MM-DD HH:mm:ss')
        })
    }
})
