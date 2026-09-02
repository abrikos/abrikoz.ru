//User.find().then(console.log);

import {setSessionUser} from "#server/utils/functions.ts";

export default defineOAuthGoogleEventHandler({
    async onSuccess(event, {user}) {
        user.avatar_url = user.picture
        user.strategy = 'google'
        await setSessionUser(user.sub, event, user)
        return sendRedirect(event, '/')
    }
})