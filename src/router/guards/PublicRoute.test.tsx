/**
 * Tests for PublicRoute component
 */

import { screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import PublicRoute from './PublicRoute';
import { ROUTES, STORAGE_KEYS } from '../../constants';
import { renderWithProviders, createMockToken, createExpiredToken } from '../../test/test-utils';

describe('PublicRoute', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders children when not authenticated', () => {
        renderWithProviders(
            <Routes>
                <Route
                    path={ROUTES.LOGIN}
                    element={
                        <PublicRoute>
                            <div>Login Page</div>
                        </PublicRoute>
                    }
                />
            </Routes>,
            { initialEntries: [ROUTES.LOGIN] },
        );

        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    it('redirects to account page when authenticated with valid token', () => {
        const token = createMockToken();
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER_ID, 'test-user-id');

        renderWithProviders(
            <Routes>
                <Route
                    path={ROUTES.LOGIN}
                    element={
                        <PublicRoute>
                            <div>Login Page</div>
                        </PublicRoute>
                    }
                />
                <Route path={ROUTES.ACCOUNT} element={<div>Account Page</div>} />
            </Routes>,
            { initialEntries: [ROUTES.LOGIN] },
        );

        expect(screen.getByText('Account Page')).toBeInTheDocument();
        expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
    });

    it('renders children when token is expired', () => {
        const token = createExpiredToken();
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

        renderWithProviders(
            <Routes>
                <Route
                    path={ROUTES.LOGIN}
                    element={
                        <PublicRoute>
                            <div>Login Page</div>
                        </PublicRoute>
                    }
                />
            </Routes>,
            { initialEntries: [ROUTES.LOGIN] },
        );

        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
});
