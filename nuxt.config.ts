// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    ssr: true,
    devtools: {enabled: true},
    modules: ['nuxt-mongoose', 'nuxt-quasar-ui', 'nuxt-auth-utils',],
    // mongoose: {
    //     uri: "mongodb://localhost:27017/abrikoz",
    //     modelsDir: 'models', // Default directory for auto-importing schemas
    // },
    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
            ]
        },
        server: {
            allowedHosts: ['abrikoz.ru']
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