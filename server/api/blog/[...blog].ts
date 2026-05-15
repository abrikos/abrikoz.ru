import {Post} from "#server/models/post";

const router = createRouter()

router.get('/all', defineEventHandler(async (event) => {
    //await Post.create({name:'========='})
    const session = await getUserSession(event)
    console.log(session )

    return Post.find()
}))

router.post('/post', defineEventHandler(async (event) => {
    const {user} = await getUserSession(event)
    if(!user) throw createError({statusCode: 403, message: 'Доступ запрещён'})
    const body = await readBody(event)
    body.user = user.login
    return Post.create(body)
}))

export default useBase('/api/blog', router.handler)