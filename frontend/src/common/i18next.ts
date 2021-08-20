import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const Languages = ['en'];

export default i18n
  .use(Backend) // user input language
  .use(LanguageDetector) // passing the i18n instance to the module of react-i18next
  .use(initReactI18next) // instantiation of i18next.
  .init({
    fallbackLng: 'en', // default language
    debug: true,
    whitelist: Languages,
    interpolation: {
      escapeValue: false,
    },
  });
