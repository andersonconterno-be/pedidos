import axios from 'axios'
import { ref } from 'vue'

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status

        if (status === 401) {
            window.location.href = '/login'
        }

        return Promise.reject(error)
    }
)

export function useApi() {
    const loading = ref(false)
    const error = ref(null)

    const request = async (method, url, data = null, config = {}) => {
        loading.value = true
        error.value = null

        try {
            const response = await api.request({
                method,
                url,
                data,
                ...config,
            })

            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message || 'Erro desconhecido'
            throw err
        } finally {
            loading.value = false
        }
    }

    const get = (url, config = {}) => request('GET', url, null, config)
    const post = (url, data, config = {}) => request('POST', url, data, config)
    const put = (url, data, config = {}) => request('PUT', url, data, config)
    const patch = (url, data, config = {}) => request('PATCH', url, data, config)
    const del = (url, config = {}) => request('DELETE', url, null, config)

    return {
        loading,
        error,
        get,
        post,
        put,
        patch,
        delete: del,
        api,
    }
}
