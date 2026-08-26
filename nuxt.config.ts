// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                {rel: 'icon', href: '/logo.svg', sizes: '32x32'},
                //{rel:'stylesheet',href:'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'},
            ],
            script: [
                //{src:'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'},
            ],
            title: "Abrikos site",


        }
    },
    compatibilityDate: '2025-07-15',
    ssr: true,
    devtools: {enabled: true},
    modules: [
        'nuxt-mongoose',
        'nuxt-auth-utils',
        '@pinia/nuxt',
        '@nuxtjs/leaflet',
        'vuetify-nuxt-module',
        'nuxt-toast'
    ],
    // mongoose: {
    //     uri: "mongodb://localhost:27017/abrikoz",
    //     modelsDir: 'models', // Default directory for auto-importing schemas
    // },
    build:{
        transpile: ['vuetify'],
    },
    vuetify: {
        moduleOptions: {
            prefixComposables: true
        },
        vuetifyOptions: {
            icons: {
                defaultSet: 'mdi',
                sets: ['mdi', 'fa']
            }
        }
    },
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
        },
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