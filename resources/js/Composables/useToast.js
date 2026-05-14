import { useToast as usePrimeToast } from 'primevue/usetoast'

export function useToast() {
    const toast = usePrimeToast()

    const success = (message, options = {}) => {
        toast.add({
            severity: 'success',
            summary: options.summary || 'Sucesso',
            detail: message,
            life: options.life || 3000,
            ...options,
        })
    }

    const error = (message, options = {}) => {
        toast.add({
            severity: 'error',
            summary: options.summary || 'Erro',
            detail: message,
            life: options.life || 5000,
            ...options,
        })
    }

    const warning = (message, options = {}) => {
        toast.add({
            severity: 'warn',
            summary: options.summary || 'Aviso',
            detail: message,
            life: options.life || 4000,
            ...options,
        })
    }

    const info = (message, options = {}) => {
        toast.add({
            severity: 'info',
            summary: options.summary || 'Informação',
            detail: message,
            life: options.life || 3000,
            ...options,
        })
    }

    const show = (options) => {
        toast.add(options)
    }

    const clear = () => {
        toast.removeAllGroups()
    }

    return {
        success,
        error,
        warning,
        info,
        show,
        clear,
    }
}
