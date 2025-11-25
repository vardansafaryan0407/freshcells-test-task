/**
 * Application constants with proper TypeScript typing.
 * Uses `as const` for literal type inference.
 */

export const ROUTES = {
    LOGIN: '/login',
    ACCOUNT: '/account',
    ROOT: '/',
} as const;

export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    USER_ID: 'user_id',
} as const;

/**
 * Type helpers for route and storage key values
 */
export type Route = (typeof ROUTES)[keyof typeof ROUTES];
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
