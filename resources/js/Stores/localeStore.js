import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { i18n } from '@/I18n/languages';
import dayjs from 'dayjs';

import 'dayjs/locale/pt-br';
import 'dayjs/locale/en';
import 'dayjs/locale/es';


export const useLocaleStore = defineStore('locale', () => {

    const dayjsLocaleMap = {
        'br': 'pt-br',
        'en': 'en',
        'es': 'es'
    };

    const availableLocales = [
        { code: 'br', name: 'Português', flag: '🇧🇷', short: 'PT' },
        { code: 'es', name: 'Español', flag: '🇪🇸', short: 'ES' },
        { code: 'en', name: 'English', flag: '🇺🇸', short: 'EN' },
    ];

    const currentLocale = computed(() => i18n.global.locale);

    const localeVersion = ref(0);

    /**
     * Define o locale usando $i18n.locale e dayjs
     * @param {string} locale - Código do locale (br, en, es)
     */
    const setLocale = (locale) => {
        if (!i18n.global.availableLocales.includes(locale)) {
            console.warn(`Locale inválido: ${locale}. Usando 'br' como padrão.`);
            locale = 'br';
        }

        i18n.global.locale = locale;

        const dayjsLocale = dayjsLocaleMap[locale] || 'pt-br';
        dayjs.locale(dayjsLocale);

        localStorage.setItem('app-locale', locale);

        document.documentElement.lang = locale === 'br' ? 'pt-BR' : locale;

        localeVersion.value++;
    };

    /**
     * Retorna informações completas do locale atual
     */
    const getCurrentLocaleInfo = computed(() => {
        return availableLocales.find(l => l.code === currentLocale.value) || availableLocales[0];
    });

    /**
     * Verifica se um locale está ativo
     */
    const isActiveLocale = (locale) => {
        return currentLocale.value === locale;
    };

    if (currentLocale.value) {
        const initialLocale = currentLocale.value;

        document.documentElement.lang = initialLocale === 'br' ? 'pt-BR' : initialLocale;

        const dayjsLocale = dayjsLocaleMap[initialLocale] || 'pt-br';
        dayjs.locale(dayjsLocale);

    }

    return {
        currentLocale,
        availableLocales,
        setLocale,
        getCurrentLocaleInfo,
        isActiveLocale,
        localeVersion
    };
});
