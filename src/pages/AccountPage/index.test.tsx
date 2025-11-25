import { screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AccountPage from './index';
import { USER_QUERY } from '../../graphql/operations';
import { renderWithProviders, createMockToken } from '../../test/test-utils';
import { STORAGE_KEYS } from '../../constants';

// Mock i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

const mocks = [
    {
        request: {
            query: USER_QUERY,
            variables: { id: '2' },
        },
        result: {
            data: {
                user: {
                    id: '2',
                    email: 'john@example.com',
                    firstName: 'John',
                    lastName: 'Doe',
                },
            },
        },
    },
];

describe('AccountPage', () => {
    beforeEach(() => {
        localStorage.clear();
        const token = createMockToken();
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER_ID, '2');
    });

    it('renders loading state initially', () => {
        renderWithProviders(
            <MockedProvider mocks={mocks}>
                <AccountPage />
            </MockedProvider>,
        );
        expect(screen.getByRole('status', { name: 'loading' })).toBeInTheDocument();
    });

    it('renders user data after loading', async () => {
        renderWithProviders(
            <MockedProvider mocks={mocks}>
                <AccountPage />
            </MockedProvider>,
        );

        await waitFor(() => {
            expect(screen.getByDisplayValue('John')).toBeInTheDocument();
            expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
        });
    });

    it('renders error state', async () => {
        const errorMock = [
            {
                request: {
                    query: USER_QUERY,
                    variables: { id: '2' },
                },
                error: new Error('An error occurred'),
            },
        ];

        renderWithProviders(
            <MockedProvider mocks={errorMock}>
                <AccountPage />
            </MockedProvider>,
        );

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent('error');
        });
    });
});
