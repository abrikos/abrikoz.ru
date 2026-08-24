import {defineMongooseModel} from '#nuxt/mongoose'
import mongoose from "mongoose";
import moment from "moment";

export const PostModel = defineMongooseModel({
    name:'post',
    schema: {
        title: {type: String, required: true},
        short: {type: String, required: true},
        poster: {type: String},
        text: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        createdAt: Date,
        published: Boolean as any
    },
    options:{
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    },
    hooks(schema){
        schema.virtual('date').get(function () {
            return moment(this.createdAt as any).format('YYYY-MM-DD HH:mm');
        })
    }
})