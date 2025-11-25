/**
 * Type-safe localStorage wrapper with error handling.
 * Provides a centralized way to manage browser storage.
 */

import { STORAGE_KEYS } from '../constants';

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * Gets an item from localStorage with error handling.
 * @param key - The storage key
 * @returns The stored value or null if not found or error occurs
 */
export const getStorageItem = (key: StorageKey): string | null => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error(`Failed to get item from localStorage: ${key}`, error);
        return null;
    }
};

/**
 * Sets an item in localStorage with error handling.
 * @param key - The storage key
 * @param value - The value to store
 */
export const setStorageItem = (key: StorageKey, value: string): void => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error(`Failed to set item in localStorage: ${key}`, error);
    }
};

/**
 * Removes an item from localStorage with error handling.
 * @param key - The storage key
 */
export const removeStorageItem = (key: StorageKey): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Failed to remove item from localStorage: ${key}`, error);
    }
};

/**
 * Clears all authentication-related data from localStorage.
 */
export const clearAuthStorage = (): void => {
    removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
    removeStorageItem(STORAGE_KEYS.USER_ID);
};
