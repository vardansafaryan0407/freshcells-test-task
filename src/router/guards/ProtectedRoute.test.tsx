/**
 * Tests for ProtectedRoute component
 */

import { screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES, STORAGE_KEYS } from '../../constants';
import { renderWithProviders, createMockToken, createExpiredToken } from '../../test/test-utils';

describe('ProtectedRoute', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('redirects to login when no token is present', () => {
        renderWithProviders(
            <Routes>
                <Route path={ROUTES.LOGIN} element={<div>Login Page</div>} />
                <Route
                    path={ROUTES.ACCOUNT}
                    element={
                        <ProtectedRoute>
                            <div>Protected Content</div>
                        </ProtectedRoute>
                    }
                />
            </Routes>,
            { initialEntries: [ROUTES.ACCOUNT] },
        );

        expect(screen.getByText('Login Page')).toBeInTheDocument();
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('renders children when token is present and valid', () => {
        const token = createMockToken();
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER_ID, 'test-user-id');

        renderWithProviders(
            <Routes>
                <Route
                    path={ROUTES.ACCOUNT}
                    element={
                        <ProtectedRoute>
                            <div>Protected Content</div>
                        </ProtectedRoute>
                    }
                />
            </Routes>,
            { initialEntries: [ROUTES.ACCOUNT] },
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('redirects to login when token is expired', () => {
        const token = createExpiredToken();
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

        renderWithProviders(
            <Routes>
                <Route path={ROUTES.LOGIN} element={<div>Login Page</div>} />
                <Route
                    path={ROUTES.ACCOUNT}
                    element={
                        <ProtectedRoute>
                            <div>Protected Content</div>
                        </ProtectedRoute>
                    }
                />
            </Routes>,
            { initialEntries: [ROUTES.ACCOUNT] },
        );

        expect(screen.getByText('Login Page')).toBeInTheDocument();
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
});
