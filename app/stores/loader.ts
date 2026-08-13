import {defineStore} from "pinia";

export const useLoaderStore = defineStore('loader', {
    state: () => ({
        loading: false
    }),
    actions: {
        setTrue () {
            this.loading = true
        },
        setFalse () {
            this.loading = false
        },
    },
})
