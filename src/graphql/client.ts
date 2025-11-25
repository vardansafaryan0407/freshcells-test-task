/**
 * Apollo Client configuration with authentication and error handling.
 * Implements proper separation of concerns and type safety.
 */

import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { clearAuthStorage } from '../lib/storage';
import { STORAGE_KEYS, ROUTES } from '../constants';
import { env } from '../config/env';

/**
 * HTTP link for GraphQL requests
 */
const httpLink = createHttpLink({
    uri: env.graphqlApiUrl,
});

/**
 * Auth link to inject JWT token into request headers
 */
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            ...(token && { authorization: `Bearer ${token}` }),
        },
    };
});

/**
 * Error link for global error handling.
 * Handles authentication errors and redirects to login.
 */
const errorLink = onError((errorResponse) => {
    // Use type assertion since Apollo's types vary by version
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const graphQLErrors = (errorResponse as any).graphQLErrors;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const networkError = (errorResponse as any).networkError;

    if (graphQLErrors) {
        for (const err of graphQLErrors) {
            // Handle invalid token errors
            if (
                err.extensions?.code === 'INTERNAL_SERVER_ERROR' &&
                err.message === 'Invalid token.'
            ) {
                clearAuthStorage();
                window.location.href = ROUTES.LOGIN;
                return;
            }

            // Log errors in development
            if (env.isDevelopment) {
                console.error(
                    `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`,
                );
            }
        }
    }

    // Handle network errors
    if (networkError) {
        if ('statusCode' in networkError && networkError.statusCode === 401) {
            clearAuthStorage();
            window.location.href = ROUTES.LOGIN;
        }

        if (env.isDevelopment) {
            console.error(`[Network error]: ${networkError.message}`);
        }
    }
});

/**
 * Apollo Client instance with configured links and cache
 */
export const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    // Configure cache policies here if needed
                },
            },
        },
    }),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
});
