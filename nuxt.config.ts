// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // app:{
    //     head:{
    //         link:[
    //             {rel:'stylesheet',href:'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', integrity:'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=', crossorigin:''},
    //         ],
    //         script:[
    //             {src:'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', integrity:'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=', crossorigin:''}
    //         ]
    //     }
    // },
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
        plugins:['Notify'],
        iconSet: 'mdi-v7',
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