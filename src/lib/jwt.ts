/**
 * JWT utility functions for token validation and parsing.
 * Follows RFC 7519 JWT specification.
 */

interface JWTPayload {
    exp: number;
    [key: string]: unknown;
}

/**
 * Validates if a JWT token is still valid based on its expiration time.
 * @param token - The JWT token string
 * @returns true if the token is valid and not expired
 */
export const isTokenValid = (token: string): boolean => {
    try {
        const payload = parseJWTPayload(token);
        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};

/**
 * Parses the payload from a JWT token.
 * @param token - The JWT token string
 * @returns The parsed JWT payload
 * @throws Error if the token format is invalid
 */
export const parseJWTPayload = (token: string): JWTPayload => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
    }

    const payload = JSON.parse(atob(parts[1]));
    return payload;
};

/**
 * Extracts the expiration timestamp from a JWT token.
 * @param token - The JWT token string
 * @returns The expiration timestamp in milliseconds, or null if invalid
 */
export const getTokenExpiration = (token: string): number | null => {
    try {
        const payload = parseJWTPayload(token);
        return payload.exp * 1000;
    } catch {
        return null;
    }
};
