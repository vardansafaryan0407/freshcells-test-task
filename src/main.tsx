/**
 * Application entry point with proper provider setup.
 * Uses react-error-boundary for production-grade error handling.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from './contexts/AuthContext';
import { App } from './App';
import { client } from './graphql/client';
import Button from './components/Button';
import './i18n/config';
import './styles/global.css';

/**
 * Error fallback component displayed when an error occurs.
 */
const ErrorFallback = ({
    error,
    resetErrorBoundary,
}: {
    error: Error;
    resetErrorBoundary: () => void;
}) => {
    return (
        <div
            role="alert"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                gap: '1rem',
                padding: '2rem',
                textAlign: 'center',
            }}
        >
            <h1>Something went wrong</h1>
            <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{error.message}</pre>
            <Button onClick={resetErrorBoundary}>Try again</Button>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => {
                // Log to error tracking service in production
                console.error('Uncaught error:', error, errorInfo);
            }}
        >
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </BrowserRouter>
            </ApolloProvider>
        </ErrorBoundary>
    </React.StrictMode>,
);
