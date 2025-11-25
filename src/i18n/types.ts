/**
 * Type definitions for i18next resources.
 * Provides type safety for translation keys across the application.
 */

import common from '../../public/locales/en/common.json';
import auth from '../../public/locales/en/auth.json';
import account from '../../public/locales/en/account.json';

/**
 * Resource structure for all namespaces
 */
const resources = {
    common,
    auth,
    account,
} as const;

export default resources;
