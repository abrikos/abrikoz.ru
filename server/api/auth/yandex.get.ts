//User.deleteMany().then(console.log);
export default defineOAuthYandexEventHandler({
    async onSuccess(event, {user}) {
        user.avatar_url = `https://avatars.mds.yandex.net/get-yapic/${user.default_avatar_id}/islands-50`
        const loggedUser = await User.findOneAndUpdate({username: user.login}, {$set: user}, {
            upsert: true,
            returnDocument: 'after'
        })
        console.log(user)
        await setUserSession(event, {user: loggedUser})
        return sendRedirect(event, '/')
    }
})