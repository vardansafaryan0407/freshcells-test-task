/**
 * Error handling utilities for consistent error messages.
 * Centralizes error parsing logic for maintainability.
 */

/**
 * Error type definitions for type-safe error handling
 */
export enum ErrorType {
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    NETWORK_ERROR = 'NETWORK_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Minimal error interface matching Apollo's error structure
 */
interface GraphQLErrorLike {
    message: string;
    networkError?: unknown;
}

/**
 * Maps GraphQL/Network errors to user-friendly error types
 * @param error - Apollo error object
 * @returns ErrorType enum value
 */
export const getErrorType = (error: GraphQLErrorLike): ErrorType => {
    const message = error.message.toLowerCase();

    if (
        message.includes('invalid identifier') ||
        message.includes('invalid password') ||
        message.includes('identifier') ||
        message.includes('password')
    ) {
        return ErrorType.INVALID_CREDENTIALS;
    }

    if (message.includes('network') || message.includes('fetch') || error.networkError) {
        return ErrorType.NETWORK_ERROR;
    }

    return ErrorType.UNKNOWN_ERROR;
};

/**
 * Gets translation key for error type
 * @param errorType - Error type enum
 * @returns i18n translation key
 */
export const getErrorTranslationKey = (errorType: ErrorType): string => {
    const keyMap: Record<ErrorType, string> = {
        [ErrorType.INVALID_CREDENTIALS]: 'login.invalid_credentials',
        [ErrorType.NETWORK_ERROR]: 'login.network_error',
        [ErrorType.UNKNOWN_ERROR]: 'login.error',
    };

    return keyMap[errorType];
};
