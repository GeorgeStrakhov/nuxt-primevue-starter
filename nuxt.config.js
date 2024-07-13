import dotenv from 'dotenv';
import Aura from '@primevue/themes/aura';

dotenv.config();

const privateRuntimeConfig = {};
for (const key in process.env) {
    if (process.env.hasOwnProperty(key)) {
        privateRuntimeConfig[key] = process.env[key];
    }
}

export default defineNuxtConfig({
    app: {
        head: {
            title: "Test App",
        },
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },

    privateRuntimeConfig,

    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || process.env.NUXT_ENV_VERCEL_URL || 'http://localhost:3000'
        }
    },

    devtools: { enabled: false },

    css: [
        "primeicons/primeicons.css",
        "primeflex/primeflex.css"
    ],

    webfontloader: {
        google: {
            families: ['Roboto:400,700']
        }
    },

    modules: [
        "@primevue/nuxt-module",
        "@vueuse/nuxt",
        "@pinia/nuxt",
        "@nuxtjs/supabase",
    ],

    primevue: {
        options: {
            theme: {
                preset: Aura
            },
            ripple: true
        },
        autoImport: true
    },

    routeRules: {
        '/': { ssr: false },
    },

    supabase: {
        redirectOptions: {
            login: '/login',
            callback: '/confirm',
            include: undefined,
            exclude: ["/", "/about"],
            cookieRedirect: false,
        }
    },

    compatibilityDate: "2024-07-03"
});
