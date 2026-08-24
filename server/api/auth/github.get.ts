//User.deleteMany().then(console.log);
export default defineOAuthGitHubEventHandler({

    async onSuccess(event, {user}) {
        const loggedUser = await UserModel.findOneAndUpdate({username: user.login}, {$set: user}, {
            upsert: true,
            returnDocument: 'after'
        })
        await setUserSession(event, {user: loggedUser})
        return sendRedirect(event, '/')
    }
})