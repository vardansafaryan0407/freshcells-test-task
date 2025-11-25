/**
 * Authentication context following Clean Architecture principles.
 *
 * Design decisions:
 * - Pure state management, no navigation side effects
 * - Separation of concerns: auth logic != routing logic
 * - Testable: no hidden behaviors
 * - Predictable: explicit over implicit
 */

import {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
    useEffect,
    useRef,
    type ReactNode,
} from 'react';
import { useApolloClient } from '@apollo/client/react';
import { STORAGE_KEYS } from '../constants';
import { isTokenValid } from '../lib/jwt';
import { getStorageItem, setStorageItem, clearAuthStorage } from '../lib/storage';

interface AuthState {
    token: string | null;
    userId: string | null;
    isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
    login: (token: string, userId: string) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Initializes auth state from storage.
 * Validates token on initialization.
 */
const initializeAuthState = (): AuthState => {
    const token = getStorageItem(STORAGE_KEYS.AUTH_TOKEN);
    const userId = getStorageItem(STORAGE_KEYS.USER_ID);
    const isAuthenticated = Boolean(token && isTokenValid(token));

    // Clean up if token is invalid
    if (token && !isAuthenticated) {
        clearAuthStorage();
        return { token: null, userId: null, isAuthenticated: false };
    }

    return { token, userId, isAuthenticated };
};

/**
 * AuthProvider manages authentication state reactively.
 *
 * Responsibilities:
 * - Manage auth state
 * - Sync with localStorage
 * - Validate token expiration
 * - Clear Apollo cache on logout
 *
 * Non-responsibilities:
 * - Navigation (handled by route guards)
 * - Business logic (handled by components)
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const client = useApolloClient();
    const [authState, setAuthState] = useState<AuthState>(initializeAuthState);

    // Track if token check is in progress to prevent race conditions
    const isCheckingToken = useRef(false);

    /**
     * Periodic token validation to handle expiration during active session
     */
    useEffect(() => {
        if (!authState.token || isCheckingToken.current) return;

        const checkInterval = setInterval(() => {
            isCheckingToken.current = true;

            if (authState.token && !isTokenValid(authState.token)) {
                // Token expired during session
                clearAuthStorage();
                setAuthState({ token: null, userId: null, isAuthenticated: false });
                void client.clearStore();
            }

            isCheckingToken.current = false;
        }, 60000); // Check every minute

        return () => clearInterval(checkInterval);
    }, [authState.token, client]);

    /**
     * Login handler - updates state and storage atomically
     */
    const login = useCallback((newToken: string, newUserId: string) => {
        // Validate token before accepting it
        if (!isTokenValid(newToken)) {
            console.error('[Auth] Attempted to login with invalid token');
            return;
        }

        setStorageItem(STORAGE_KEYS.AUTH_TOKEN, newToken);
        setStorageItem(STORAGE_KEYS.USER_ID, newUserId);
        setAuthState({
            token: newToken,
            userId: newUserId,
            isAuthenticated: true,
        });
    }, []);

    /**
     * Logout handler - clears state, storage, and Apollo cache
     */
    const logout = useCallback(async () => {
        clearAuthStorage();
        setAuthState({ token: null, userId: null, isAuthenticated: false });

        // Clear Apollo cache to remove any sensitive data
        try {
            await client.clearStore();
        } catch (error) {
            console.error('[Auth] Failed to clear Apollo cache:', error);
        }
    }, [client]);

    // Memoize context value to prevent unnecessary re-renders
    const value = useMemo(
        () => ({
            token: authState.token,
            userId: authState.userId,
            isAuthenticated: authState.isAuthenticated,
            login,
            logout,
        }),
        [authState.token, authState.userId, authState.isAuthenticated, login, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to access auth context.
 * Throws descriptive error if used outside provider.
 *
 * @throws Error if used outside AuthProvider
 */
export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            'useAuth must be used within AuthProvider. ' +
                'Wrap your component tree with <AuthProvider>.',
        );
    }
    return context;
};
