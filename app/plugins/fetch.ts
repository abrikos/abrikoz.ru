import {Notify} from 'quasar'
import {useLoaderStore} from "~/stores/loader";

export default defineNuxtPlugin((_nuxtApp) => {
    const loaderStore = useLoaderStore()
    const {setTrue, setFalse} = loaderStore

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
            async GET(path: string) {
                setTrue()
                //await new Promise(resolve => setTimeout(resolve, 5000));
                if (debug) console.log('GET', path);
                const res = await $fetch(apiPath + path)
                    .catch(onError)
                if (res && debug && showResponse) console.log('GET response:', path, res)
                setFalse()
                return res
            },
            async DELETE(path: string) {
                setTrue()
                //await new Promise(resolve => setTimeout(resolve, 5000));
                if (debug) console.log('DELETE', path);
                const res = await $fetch(apiPath + path, {method: 'DELETE'})
                    .catch(onError)
                if (res && debug && showResponse) console.log('DELETE response:', path, res)
                setFalse()
                return res
            },
            async POST(path: string, body?: any) {
                setTrue()
                //await new Promise(resolve => setTimeout(resolve, 5000));
                if (debug) console.log('POST', path, body);
                const res = await $fetch(apiPath + path, {method: 'POST', body})
                    .catch(onError)
                if (res && debug && showResponse) console.log('POST response:', path, res)
                setFalse()
                return res
            },
            async PUT(path: string, body?: any) {
                setTrue()
                //await new Promise(resolve => setTimeout(resolve, 5000));
                if (debug) console.log('PUT', path, body);
                const res = await $fetch(apiPath + path, {method: 'PUT', body})
                    .catch(onError)
                if (res && debug && showResponse) console.log('PUT response:', path, res)
                setFalse()
                return res
            },
            async PATCH(path: string, body?: any) {
                setTrue()
                //await new Promise(resolve => setTimeout(resolve, 5000));
                if (debug) console.log('PATCH', path, body);
                const res = await $fetch(apiPath + path, {method: 'PATCH', body})
                    .catch(onError)
                if (res && debug && showResponse) console.log('PATCH response:', path, res)
                setFalse()
                return res
            },
        }
    }
})
