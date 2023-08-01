import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import EN from './en-translation.json'
import TH from './th-translation.json'

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: EN },
    th: { translation: TH },
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
