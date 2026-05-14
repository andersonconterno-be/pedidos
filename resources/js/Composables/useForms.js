import { reactive, ref } from 'vue'

export function useForms(initialData = {}) {
    const form = reactive({ ...initialData })
    const loading = ref(false)
    const errors = ref({})
    const initialState = { ...initialData }

    const setError = (field, message) => {
        errors.value[field] = message
    }

    const setErrors = (errorsObj) => {
        errors.value = { ...errorsObj }
    }

    const clearError = (field) => {
        delete errors.value[field]
    }

    const clearErrors = () => {
        errors.value = {}
    }

    const hasError = (field) => {
        return !!errors.value[field]
    }

    const reset = () => {
        Object.assign(form, initialState)
        clearErrors()
    }

    const submit = async (callback) => {
        loading.value = true
        clearErrors()

        try {
            const result = await callback(form)
            return result
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors)
            } else if (error.response?.data?.message) {
                setError('general', error.response.data.message)
            }
            throw error
        } finally {
            loading.value = false
        }
    }

    return {
        form,
        loading,
        errors,
        setError,
        setErrors,
        clearError,
        clearErrors,
        hasError,
        reset,
        submit,
    }
}
