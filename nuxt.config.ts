// https://nuxt.com/docs/api/configuration/nuxt-config

import {EventEmitter} from 'events'

// Increase the global limit from 10 to 20 (or higher if needed)
EventEmitter.defaultMaxListeners = 200
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
        'nuxt-quasar-ui',
        '@nuxtjs/i18n'
    ],
    // mongoose: {
    //     uri: "mongodb://localhost:27017/abrikoz",
    //     modelsDir: 'models', // Default directory for auto-importing schemas
    // },
    i18n: {
        locales: [
            {name: 'English', code: 'en', language: 'en-US', file: 'computed/en.ts'},
            {name: 'Русский', code: 'ru', language: 'ru-RU', file: 'ru.json'}
        ],
        defaultLocale: 'en',
        strategy: 'no_prefix'
    },
    build: {
        transpile: ['vuetify'],
    },
    quasar: {
        sassVariables: '~~/public/quazar.variables.sass',
        plugins: ['Notify'],
        iconSet: 'mdi-v7',
        components: {
            defaults: {
                QTable: {
                    dense: true,
                    pagination: {rowsPerPage: 20}
                },
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