//PostModel.find({published:true}).populate('user').then(console.log);
export default defineEventHandler(async () => {
    return PostModel.find({published: true}).populate("user");
})