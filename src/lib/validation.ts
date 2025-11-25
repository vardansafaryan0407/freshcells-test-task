/**
 * Validation utilities following RFC standards.
 * Centralized validation logic for reusability and testability.
 */

/**
 * Email validation pattern following RFC 5322 (simplified)
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns true if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email.trim());
};

/**
 * Validates required field is not empty
 * @param value - Value to check
 * @returns true if valid, false otherwise
 */
export const isRequired = (value: string): boolean => {
    return value.trim().length > 0;
};

/**
 * Validates password meets minimum requirements
 * @param password - Password to validate
 * @param minLength - Minimum length (default 1)
 * @returns true if valid, false otherwise
 */
export const isValidPassword = (password: string, minLength = 1): boolean => {
    return password.length >= minLength;
};
