import {defineMongooseModel} from '#nuxt/mongoose'

export const Post = defineMongooseModel('Post', {
    title: {type: String, required: true},
    short: {type: String, required: true},
    poster: {type: String},
    text: {type: String},
    user: {type: String},

}, {
    timestamps: {createdAt: 'createdAt'},
    toObject: {virtuals: true},
    // use if your results might be retrieved as JSON
    // see http://stackoverflow.com/q/13133911/488666
    toJSON: {virtuals: true}
})