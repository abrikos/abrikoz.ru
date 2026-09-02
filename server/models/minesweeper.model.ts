import mongoose from 'mongoose';
import moment from "moment";

const Schema = mongoose.Schema;
const name = 'minesweeper';


export interface IMinesweeper {
    id: string,
    rows: number
    cols: number
    cellsCount: number
    percent: number
    mines: number[]
    turns: number[]
    turn: number
    idx: Function
    cell: Function
    counts: Object[]
    finished: number
    createdAt: Date
    updatedAt: Date
}

const schema = new Schema<IMinesweeper>({
        rows: {type: Number, required: true},
        cols: {type: Number, required: true},
        percent: {type: Number, required: true},
        mines: [{type: Number, required: true}],
        turns: [{type: Number}],
        turn: {type: Number, default: 0},
        counts: [{type: Object}],
        finished: {type: Number, default: 0},

    },
    {
        timestamps: true,
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    });

schema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss');
    })

schema.virtual('playTime')
    .get(function () {
        const dateA = moment(this.createdAt)
        const dateB = moment(this.updatedAt);
        const diffDuration = moment.duration(dateB.diff(dateA))
        const days = Math.floor(diffDuration.asDays()); // Use asDays() to capture absolute total days
        const hours = String(diffDuration.hours()).padStart(2, '0');
        const minutes = String(diffDuration.minutes()).padStart(2, '0');
        return {days, hours, minutes};
    })

schema.virtual('cellsCount')
    .get(function () {
        return this.rows * this.cols
    })

schema.methods.idx = function (row: number, col: number) {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return -1
    return row * this.rows + col
}

schema.methods.cell = function (idx: number) {
    const row = Math.floor(idx / this.cols)
    const col = idx - row * this.cols
    return {row, col}
}


export const MinesweeperModel = mongoose.model<IMinesweeper>(name, schema)