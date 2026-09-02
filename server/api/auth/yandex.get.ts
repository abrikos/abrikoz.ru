UserModel.find().then(console.log);
//UserModel.deleteMany().then(console.log);
// FiscalModel.deleteMany().then(console.log);
// GoodModel.deleteMany().then(console.log);
import {setSessionUser} from "#server/utils/functions.ts";

export default defineOAuthYandexEventHandler({
    async onSuccess(event, {user}) {
        user.avatar_url = `https://avatars.mds.yandex.net/get-yapic/${user.default_avatar_id}/islands-50`
        user.email = user.default_email
        user.strategy = 'yandex'
        await setSessionUser(user.id, event, user)
        return sendRedirect(event, '/')
    }
})