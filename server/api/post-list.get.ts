//PostModel.find({published:true}).populate('user').then(console.log);
export default defineEventHandler(async (event) => {
    const {user} = await getUserSession(event)
    const {my} = getQuery(event)
    if(my && user){
        return PostModel.find({user}).populate("user");
    }else {
        return PostModel.find({published: true}).populate("user");
    }
})