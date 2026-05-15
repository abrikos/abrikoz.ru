//User.find().then(console.log);

export default defineOAuthGoogleEventHandler({
    async onSuccess(event, {user}) {
        const loggedUser = await User.findOneAndUpdate({email: user.email}, {$set: user}, {
            upsert: true,
            returnDocument: 'after'
        })
        await setUserSession(event, {user: loggedUser})
        return sendRedirect(event, '/')
    }
})