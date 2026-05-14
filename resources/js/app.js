import '../css/app.css'
import './bootstrap'
import 'vue-toastification/dist/index.css';
import 'primeicons/primeicons.css'

import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { setupPrimeVueConfig } from '@/Configuration/primevue-config'
import { setupPrimeVueComponents } from '@/Configuration/primevue-components'
import { i18n } from '@/I18n/languages'
import  Toast from 'vue-toastification';
// import Aura from '@primeuix/themes/aura';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,

    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),

    setup({ el, App, props, plugin }) {
        const pinia = createPinia()
        const app = createApp({ render: () => h(App, props) })

        app.use(plugin)
        app.use(pinia)
        app.use(PrimeVue, setupPrimeVueConfig())
        // app.use(PrimeVue, {
        //     theme: {
        //         preset: Aura
        //     }
        // });
        app.use(i18n)
        app.use(Toast)

        setupPrimeVueComponents(app);

        return app.mount(el)
    },

    progress: {
        color: 'var(--primary-500, #0ea5e9)',
        showSpinner: true,
    },
})
