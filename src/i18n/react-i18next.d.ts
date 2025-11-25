/**
 * Type augmentation for react-i18next.
 * Enables type-safe translation keys in useTranslation hook.
 */

import resources from './types';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common';
        resources: typeof resources;
    }
}
