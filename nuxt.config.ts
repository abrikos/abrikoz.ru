// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app:{
        head:{
            link:[
                {rel:'icon',href:'/logo.svg', sizes:'32x32'},
            ],
            title:"Abrikos site"
        }
    },
    compatibilityDate: '2025-07-15',
    ssr: true,
    devtools: {enabled: true},
    modules: ['nuxt-mongoose', 'nuxt-quasar-ui', 'nuxt-auth-utils','@pinia/nuxt', '@nuxtjs/leaflet'],
    // mongoose: {
    //     uri: "mongodb://localhost:27017/abrikoz",
    //     modelsDir: 'models', // Default directory for auto-importing schemas
    // },
    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
                'vue3-apexcharts',
            ]
        },
        server: {
            allowedHosts: ['abrikoz.ru', 'abrikozz.ru']
        }
    },
    quasar:{
        sassVariables: '~~/public/quazar.variables.sass',
        plugins:['Notify'],
        iconSet: 'mdi-v7',
    },
    runtimeConfig: {
        session: {
            maxAge: 60 * 60 * 24 * 7 // 1 week
        }
    }
    // routeRules: {
    //     // Generated at build time for SEO purpose
    //     '/': {prerender: true},
    //     // Cached for 1 hour
    //     '/api/*': {cache: {maxAge: 60 * 60}},
    //     // Redirection to avoid 404
    //     '/old-page': {
    //         redirect: {to: '/new-page', statusCode: 302},
    //     },
    //     // ...
    // }

})