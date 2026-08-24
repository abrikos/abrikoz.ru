export default defineEventHandler(async (event) => {
    const {user} = await getUserSession(event)
    if (!user) throw createError({status: 403, message: 'Доступ запрещён'})
    const {id} = getQuery(event)
    const post = await PostModel.findById(id).populate('user')
    if( post?.user === user || post?.published){
        return post
    }

})