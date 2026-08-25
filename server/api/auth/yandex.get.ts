//User.deleteMany().then(console.log);
export default defineOAuthYandexEventHandler({
    async onSuccess(event, {user}) {
        user.avatar_url = `https://avatars.mds.yandex.net/get-yapic/${user.default_avatar_id}/islands-50`
        const loggedUser = await UserModel.findOneAndUpdate({username: user.login}, {$set: user}, {
            upsert: true,
            returnDocument: 'after'
        })
        await setUserSession(event, {user: loggedUser})
        return sendRedirect(event, '/')
    }
})