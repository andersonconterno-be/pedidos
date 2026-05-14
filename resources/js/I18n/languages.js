import { createI18n } from 'vue-i18n';
import messages from '@/I18n/locales';

export const i18n = createI18n({
  locale: localStorage.getItem('app-locale') || 'br',
  fallbackLocale: 'br',
  messages
});
