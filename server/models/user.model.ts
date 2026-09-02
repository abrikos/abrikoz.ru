import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    [key: string]: any

    ids: string[]
    strategies: object[]
    active: number
    name: string
    admin: boolean
}

const schema = new mongoose.Schema<IUser>({
    ids: [{type: String}],
    strategies: {type: [Object], required: true},
    active: {type: Number, default: 0}
}, {
    timestamps: {createdAt: 'createdAt'},
    toObject: {virtuals: true},
    // use if your results might be retrieved as JSON
    // see http://stackoverflow.com/q/13133911/488666
    toJSON: {virtuals: true}
})

schema.virtual('name')
    .get(function () {
        if (!this.strategies?.length) return 'None'
        return this.strategies[this.active].login || this.strategies[this.active].name;
    })

schema.virtual('avatar_url')
    .get(function () {
        if (!this.strategies?.length) return 'None'
        return this.strategies[this.active].avatar_url;
    })

schema.virtual('admin')
    .get(function () {
        if (!this.strategies?.length) return
        return this.strategies.map((s:any)=>s.email).includes(process.env.ADMIN_EMAIL);
    })


export const UserModel = mongoose.model<IUser>('user', schema)