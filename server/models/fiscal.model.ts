import {defineMongooseModel} from '#nuxt/mongoose'
import mongoose from "mongoose";
import moment from "moment";

export const GoodModel = defineMongooseModel({
    name:'good',
    schema: {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
        deleted: {type: Boolean, default: false} as any,
        fiscal: {type: mongoose.Schema.Types.ObjectId, ref: 'fiscal'},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    },
    options:{
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    },
    hooks(schema){
        schema.virtual('sum')
            .get(function (this) {
                return (this.price * this.quantity / 100).toFixed(2)
            })
        schema.virtual('priceHuman')
            .get(function (this) {
                return (this.price / 100).toFixed(2)
            })

    }
})

export const FiscalModel = defineMongooseModel({
    name:'fiscal',
    schema: {
        owner: {type: String},
        retailPlace: {type: String},
        retailPlaceAddress: {type: String},
        operator: {type: String},
        fiscalDocumentNumber: {type: Number, unique: true, required: true},
        fiscalSign: {type: Number, unique: true},
        totalSum: {type: Number, required: true},
        dateTime: {type: Date, required: true} as any,
        deleted: {type: Boolean, default: false} as any,
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    },
    options:{
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    },
    hooks(schema){
        schema.virtual('date')
            .get(function () {
                return moment(this.dateTime).format('YYYY-MM-DD HH:mm')
            })
        schema.virtual('retailPlaceFull')
            .get(function () {
                return this.retailPlace + ', ' + this.retailPlaceAddress
            })
        schema.virtual('sumHuman')
            .get(function () {
                return (this.totalSum / 100).toFixed(2)
            })

        schema.virtual('goods', {
            ref: 'good',
            localField: '_id',
            foreignField: 'fiscal'
        })

    }
})