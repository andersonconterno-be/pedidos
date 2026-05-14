// ===== SERVIÇOS =====
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'

// ===== DIRETIVAS =====
import BadgeDirective from 'primevue/badgedirective'
import Ripple from 'primevue/ripple'
import StyleClass from 'primevue/styleclass'
import FocusTrap from 'primevue/focustrap'
import AnimateOnScroll from 'primevue/animateonscroll'
import Tooltip from 'primevue/tooltip'
import KeyFilter from 'primevue/keyfilter'



/**
 * Configura todos os componentes PrimeVue na aplicação
 * @param {Object} app - Instância da aplicação Vue
 */
export function setupPrimeVueComponents(app) {
    // ===== SERVIÇOS =====
    app.use(ToastService)
    app.use(ConfirmationService)
    app.use(DialogService)

    // ===== DIRETIVAS =====
    app.directive('badge', BadgeDirective)
    app.directive('ripple', Ripple)
    app.directive('styleclass', StyleClass)
    app.directive('focustrap', FocusTrap)
    app.directive('animateonscroll', AnimateOnScroll)
    app.directive('tooltip', Tooltip)
    app.directive('keyfilter', KeyFilter)
}