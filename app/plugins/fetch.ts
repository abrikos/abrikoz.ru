import {useLoaderStore} from "~/stores/loader";

export default defineNuxtPlugin((_nuxtApp) => {
    const {setTrue, setFalse} = useLoaderStore()
    const toast = useToast()

    function onError(e: any) {
        toast.error({
            title: 'HTTP rror',
            message: e.status + ':' + (e.response._data.message || e.response._data),
            position: 'center',
            layout: 1
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
