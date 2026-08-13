const router = createRouter()

router.get('/all', defineEventHandler(async () => {
    return Post.find()
}))

router.post('/post', defineEventHandler(async (event) => {
    const {user} = await getUserSession(event)
    if (!user) throw createError({status: 403, message: 'Доступ запрещён'})
    const body = await readBody(event)
    return Post.create({user, ...body})
}))

export default useBase('/api/blog', router.handler)