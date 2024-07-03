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
            title: "My Nuxt App",
        },
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },

    privateRuntimeConfig,

    devtools: { enabled: true },

    css: [
        "primeicons/primeicons.css",
        "primeflex/primeflex.css"
    ],

    webfontloader: {
        google: {
            families: ['Roboto:400,700']
        }
    },

    modules: ["@primevue/nuxt-module"],

    primevue: {
        options: {
            theme: {
                preset: Aura
            },
            ripple: true
        },
        autoImport: true
    },

    compatibilityDate: "2024-07-03"
});
