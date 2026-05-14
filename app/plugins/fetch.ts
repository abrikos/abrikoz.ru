import { Notify } from 'quasar'

export default defineNuxtPlugin((_nuxtApp) => {
    //const config = useRuntimeConfig()

    function onError(e: any) {
        Notify.create({
            message: 'Ошибка',
            caption: e.status + ':' + (e.response._data.message || e.response._data),
            icon: 'mdi-alert-circle',
            color: 'red',
            position: 'center',
        })
    }

    const debug = true
    const showResponse = false
    const apiPath = '/api'
    return {
        provide: {
            async POST(path: string, body?: any) {
                //await new Promise(resolve => setTimeout(resolve, 5000));
                if (debug) console.log('POST', path, body);
                const res = await $fetch(apiPath + path, {method: 'POST', body})
                    .catch(onError)
                if (res && debug && showResponse) console.log('POST response:', path, res)
                return res
            },
        }
    }
})
