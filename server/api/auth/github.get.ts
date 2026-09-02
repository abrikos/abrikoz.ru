//User.deleteMany().then(console.log);
import {setSessionUser} from "#server/utils/functions.ts";

export default defineOAuthGitHubEventHandler({
    async onSuccess(event, {user}) {
        await setSessionUser(user.id.toString(), event, {strategy: 'github', ...user})
        return sendRedirect(event, '/')
    }
})