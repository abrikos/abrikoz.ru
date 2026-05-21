import mongoose from 'mongoose';
import {Weather} from "./server/models/weather.ts"

process.loadEnvFile();
const uri = process.env.NUXT_MONGOOSE_URI
async function main() {
    await mongoose.connect(uri)
    console.log(Weather)
}
main()