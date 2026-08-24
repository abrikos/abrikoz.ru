import {defineMongooseModel} from '#nuxt/mongoose'
import mongoose from "mongoose";

export const LinkModel = defineMongooseModel({
    name:'link',
    schema: {
        title: {type: String},
        description: {type: String},
        ogTitle: {type: String},
        ogDescription: {type: String},
        ogImage: {type: String},
        coordinates: {type: [Number]},
        hidden: {type: Boolean, default: false} as any,
        url: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    },
    options:{
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    }
})
