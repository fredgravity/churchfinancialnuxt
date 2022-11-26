// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@formkit/nuxt',
        '@pinia/nuxt',
    ],
    postcss: {
        plugins: {
           tailwindcss: {},
           autoprefixer: {},
        },
    },
    css: [
        '@/assets/css/main.css',
        // '@/assets/css/login.css',
        '~/assets/vendor/fonts/boxicons.css',
        '~/assets/vendor/css/core.css',
        '~/assets/vendor/css/theme-default.css',
        '~/assets/css/demo.css',
        '~/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',
        '~/assets/vendor/fonts/boxicons.css',
        '~/assets/vendor/css/core.css',
        '~/assets/vendor/css/theme-default.css',
        '~/assets/css/demo.css',
        '~/assets/vendor/libs/apex-charts/apex-charts.css',
        '~/assets/vendor/css/pages/page-misc.css'
    ],
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
    plugins: [
        // '@/plugins/flowbite.client.ts'
    ],
    ssr: false, 
    target: 'static',

    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE || 'http://127.0.0.1:8000/api/v1'
        }
    },

    

})
