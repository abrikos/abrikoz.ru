export default defineEventHandler(async (event) => {
    const {user} = await getUserSession(event) as unknown as {user:{id:string}}
    const {id} = getQuery(event)
    const post = await PostModel.findById(id).populate('user')as unknown as {user:{id:string}, published:boolean}
    if( post?.user.id === user?.id || post?.published){
        return post
    }

})