import { ref, watch, onMounted } from 'vue'

const STORAGE_KEY = 'theme-preference'

export function useAppearance() {
    const isDark = ref(false)

    const getSystemPreference = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    const getStoredPreference = () => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored === 'dark') return true
        if (stored === 'light') return false
        return getSystemPreference()
    }

    const applyTheme = (dark) => {
        const root = document.documentElement
        if (dark) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }

    const setTheme = (dark) => {
        isDark.value = dark
        localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
        applyTheme(dark)
    }

    const toggleTheme = () => {
        setTheme(!isDark.value)
    }

    const setDark = () => {
        setTheme(true)
    }

    const setLight = () => {
        setTheme(false)
    }

    const resetToSystem = () => {
        localStorage.removeItem(STORAGE_KEY)
        const systemPreference = getSystemPreference()
        isDark.value = systemPreference
        applyTheme(systemPreference)
    }

    onMounted(() => {
        isDark.value = getStoredPreference()
        applyTheme(isDark.value)

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e) => {
            if (!localStorage.getItem(STORAGE_KEY)) {
                isDark.value = e.matches
                applyTheme(e.matches)
            }
        }
        mediaQuery.addEventListener('change', handleChange)
    })

    watch(isDark, (newValue) => {
        applyTheme(newValue)
    })

    return {
        isDark,
        toggleTheme,
        setTheme,
        setDark,
        setLight,
        resetToSystem,
    }
}
