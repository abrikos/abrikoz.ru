import {defineMongooseModel} from '#nuxt/mongoose'

export const Weather = defineMongooseModel('Weather', {
    temperature: {type: Number, required: true},
    pressure: {type: Number, required: true},
    wind_speed: {type: Number},
    wind_direction: {type: String},

}, {
    timestamps: {createdAt: 'createdAt'},
    toObject: {virtuals: true},
    // use if your results might be retrieved as JSON
    // see http://stackoverflow.com/q/13133911/488666
    toJSON: {virtuals: true}
})