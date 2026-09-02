export default defineEventHandler(async (event) => {
    const {user} = await getUserSession(event) as unknown as { user: { id: string } }
    const {id} = getQuery(event)
    const post = await PostModel.findById(id).populate('user').catch(console.warn) as unknown as {
        user: { id: string },
        published: boolean
    }
    if (post?.user?.id === user?.id || post?.published) {
        return post
    }
    if (!post) throw createError({status: 404, message: 'Not found'})
})