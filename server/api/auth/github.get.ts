//User.deleteMany().then(console.log);
export default defineOAuthGitHubEventHandler({
    async onSuccess(event, {user}) {
        const loggedUser = await User.findOneAndUpdate({username: user.login}, {$set: user}, {
            upsert: true,
            returnDocument: 'after'
        })
        console.log(loggedUser)
        await setUserSession(event, {user: loggedUser})
        return sendRedirect(event, '/')
    }
})