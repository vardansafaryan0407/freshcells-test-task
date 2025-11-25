/**
 * Account page displaying user information with logout functionality.
 * Uses generated GraphQL types and auth context.
 */

import { useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_QUERY } from '../../graphql/operations';
import type { UserQuery } from '../../gql/graphql';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../constants';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './styles.module.css';

const AccountPage = () => {
    const { t } = useTranslation(['account', 'common']);
    const navigate = useNavigate();
    const { userId, logout } = useAuth();

    const { data, loading, error } = useQuery<UserQuery>(USER_QUERY, {
        variables: { id: userId || '' },
        skip: !userId,
    });

    const handleLogout = useCallback(async () => {
        await logout();
        // Navigate explicitly (not hidden in context)
        navigate(ROUTES.LOGIN, { replace: true });
    }, [logout, navigate]);

    if (loading) {
        return (
            <div className={styles.centerContainer}>
                <LoadingSpinner size="lg" label={t('loading', { ns: 'account' })} />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.centerContainer} role="alert">
                <div className={styles.error}>{t('error', { ns: 'common' })}</div>
                <Button onClick={() => window.location.reload()} variant="secondary">
                    {t('retry', { ns: 'common' })}
                </Button>
            </div>
        );
    }

    const user = data?.user;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>{t('title', { ns: 'account' })}</h1>

                <div className={styles.userInfo}>
                    <Input
                        label={t('firstName', { ns: 'account' })}
                        value={user?.firstName || ''}
                        readOnly
                        disabled
                    />
                    <Input
                        label={t('lastName', { ns: 'account' })}
                        value={user?.lastName || ''}
                        readOnly
                        disabled
                    />
                </div>

                <Button onClick={handleLogout} variant="outline" className={styles.logoutButton}>
                    {t('logout', { ns: 'account' })}
                </Button>
            </div>
        </div>
    );
};

export default AccountPage;
