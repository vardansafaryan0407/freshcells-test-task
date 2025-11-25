/**
 * Application routing configuration with code splitting.
 * Uses React.lazy for automatic code splitting and Suspense for loading states.
 */

import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProtectedRoute from './guards/ProtectedRoute';
import PublicRoute from './guards/PublicRoute';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ROUTES } from '../constants';

// Lazy-loaded page components for optimal bundle splitting
const LoginPage = lazy(() => import('../pages/LoginPage'));
const AccountPage = lazy(() => import('../pages/AccountPage'));

/**
 * Loading fallback component for Suspense
 */
const PageLoader = () => {
    const { t } = useTranslation();
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <LoadingSpinner size="lg" label={t('loading')} />
        </div>
    );
};

export const AppRoutes = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route
                    path={ROUTES.LOGIN}
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path={ROUTES.ACCOUNT}
                    element={
                        <ProtectedRoute>
                            <AccountPage />
                        </ProtectedRoute>
                    }
                />
                <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.ACCOUNT} replace />} />
                <Route path="*" element={<Navigate to={ROUTES.ACCOUNT} replace />} />
            </Routes>
        </Suspense>
    );
};
