/**
 * Test utilities and wrappers for consistent test setup.
 * Provides all necessary providers for components that depend on context.
 */

import { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { Observable } from '@apollo/client/utilities';
import { AuthProvider } from '../contexts/AuthContext';

/**
 * Creates a mock Apollo Client for testing
 */
export const createMockApolloClient = () => {
    return new ApolloClient({
        link: new ApolloLink(() => new Observable(() => {})),
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: 'no-cache',
            },
            mutate: {
                fetchPolicy: 'no-cache',
            },
        },
    });
};

interface AllProvidersProps {
    children: React.ReactNode;
    initialEntries?: MemoryRouterProps['initialEntries'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apolloClient?: any;
}

/**
 * Wrapper component that provides all necessary context providers
 */
export function AllProviders({
    children,
    initialEntries = ['/'],
    apolloClient = createMockApolloClient(),
}: AllProvidersProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <MemoryRouter initialEntries={initialEntries}>
                <AuthProvider>{children}</AuthProvider>
            </MemoryRouter>
        </ApolloProvider>
    );
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    initialEntries?: MemoryRouterProps['initialEntries'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apolloClient?: any;
}

/**
 * Custom render function that includes all providers
 */
export function renderWithProviders(
    ui: ReactElement,
    { initialEntries, apolloClient, ...renderOptions }: CustomRenderOptions = {},
) {
    return render(ui, {
        wrapper: ({ children }) => (
            <AllProviders initialEntries={initialEntries} apolloClient={apolloClient}>
                {children}
            </AllProviders>
        ),
        ...renderOptions,
    });
}

/**
 * Creates a valid JWT token for testing
 * @param expiresInSeconds - Number of seconds until token expires (default: 3600 = 1 hour)
 */
export function createMockToken(expiresInSeconds = 3600): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
        JSON.stringify({
            exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
            sub: 'test-user-id',
        }),
    );
    return `${header}.${payload}.signature`;
}

/**
 * Creates an expired JWT token for testing
 */
export function createExpiredToken(): string {
    return createMockToken(-3600); // Expired 1 hour ago
}

// Re-export everything from testing library
export * from '@testing-library/react';
export { renderWithProviders as render };
