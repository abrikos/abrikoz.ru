//User.deleteMany().then(console.log);
export default defineOAuthGoogleEventHandler({
    async onSuccess(event, {user}) {
        //await User.findOneAndUpdate({login: user.login}, {$set: user}, {upsert: true, new: true})
        await setUserSession(event, {user})
        return sendRedirect(event, '/')
    }
})