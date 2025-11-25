/**
 * i18next configuration with lazy loading and language detection.
 * Uses separate JSON files per namespace for better scalability.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // Load translations using http backend
    .use(HttpBackend)
    // Detect user language
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize i18next
    .init({
        // Fallback language if detection fails
        fallbackLng: 'en',

        // Supported languages
        supportedLngs: ['en'],

        // Default namespace
        defaultNS: 'common',

        // Available namespaces
        ns: ['common', 'auth', 'account'],

        // Debug mode (disable in production)
        debug: false,

        // Backend configuration for loading translation files
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },

        // Language detector options
        detection: {
            // Order of language detection methods
            order: ['localStorage', 'navigator'],
            // Cache user language preference
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },

        // React-specific options
        react: {
            // Suspense mode for loading translations
            useSuspense: true,
        },

        // Interpolation options
        interpolation: {
            // React already escapes values
            escapeValue: false,
        },
    });

export default i18n;
