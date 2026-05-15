//User.deleteMany().then(console.log);
export default defineOAuthGitHubEventHandler({
    async onSuccess(event, {user}) {
        //await User.findOneAndUpdate({login: user.login}, {$set: user}, {upsert: true, new: true})
        await setUserSession(event, {user})
        return sendRedirect(event, '/')
    }
})