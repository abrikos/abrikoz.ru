import {defineMongooseModel} from '#nuxt/mongoose'
import * as mongoose from "mongoose";


export const User = defineMongooseModel({
    name: 'User',
    schema:{
        login: {type: String},
        email: {type: String},
        avatar_url: {type: String},
        picture: {type: String},
        name: {type: String},
    },
    options:{
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    },
    hooks(schema) {
        schema.virtual('displayName').get(function () {
            return this.name || this.login
        })

        schema.virtual('avatar').get(function () {
            return this.avatar_url || this.picture
        })

    }
})



