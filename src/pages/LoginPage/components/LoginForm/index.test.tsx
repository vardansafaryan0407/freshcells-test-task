/**
 * Tests for LoginForm component
 */

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MockedProvider } from '@apollo/client/testing/react';
import LoginForm from './index';
import { LOGIN_MUTATION } from '../../../../graphql/operations';
import { renderWithProviders } from '../../../../test/test-utils';

// Mock i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

const mocks = [
    {
        request: {
            query: LOGIN_MUTATION,
            variables: {
                identifier: 'test@example.com',
                password: 'password123',
            },
        },
        result: {
            data: {
                login: {
                    jwt: 'fake-jwt-token',
                    user: {
                        id: '123',
                    },
                },
            },
        },
    },
];

describe('LoginForm', () => {
    it('renders login form', () => {
        renderWithProviders(
            <MockedProvider mocks={mocks}>
                <LoginForm />
            </MockedProvider>,
        );

        expect(screen.getByLabelText('login.email')).toBeInTheDocument();
        expect(screen.getByLabelText('login.password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'login.submit' })).toBeInTheDocument();
    });

    it('validates required fields', async () => {
        renderWithProviders(
            <MockedProvider mocks={mocks}>
                <LoginForm />
            </MockedProvider>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'login.submit' }));

        await waitFor(() => {
            expect(screen.getAllByText('login.required')).toHaveLength(2);
        });
    });

    it('validates email format', async () => {
        renderWithProviders(
            <MockedProvider mocks={mocks}>
                <LoginForm />
            </MockedProvider>,
        );

        const emailInput = screen.getByLabelText('login.email');
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(screen.getByRole('button', { name: 'login.submit' }));

        await waitFor(() => {
            expect(screen.getByText('login.invalid_email')).toBeInTheDocument();
        });
    });
});
