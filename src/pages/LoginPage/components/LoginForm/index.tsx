/**
 * Login form component following presentation/container pattern.
 * Logic extracted to custom hook for better testability and reusability.
 */

import { useCallback, type FormEvent } from 'react';
import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { LOGIN_MUTATION } from '../../../../graphql/operations';
import type { LoginMutation } from '../../../../gql/graphql';
import { useAuth } from '../../../../contexts/AuthContext';
import { useLoginForm } from '../../../../hooks/useLoginForm';
import { getErrorType, getErrorTranslationKey } from '../../../../lib/errors';
import { ROUTES } from '../../../../constants';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import styles from './styles.module.css';

const LoginForm = () => {
    const { t } = useTranslation('auth');
    const navigate = useNavigate();
    const location = useLocation();
    const { login: saveAuth } = useAuth();
    const { email, password, errors, setEmail, setPassword, validate } = useLoginForm();

    const [login, { loading, error: mutationError }] = useMutation<LoginMutation>(LOGIN_MUTATION, {
        onCompleted: (data) => {
            const { jwt, user } = data.login;
            if (jwt && user.id) {
                // Save auth state
                saveAuth(jwt, user.id);

                // Navigate to intended destination (explicit, not hidden)
                const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
                navigate(from || ROUTES.ACCOUNT, { replace: true });
            }
        },
    });

    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (validate()) {
                login({ variables: { identifier: email, password } });
            }
        },
        [validate, login, email, password],
    );

    const errorMessage = mutationError
        ? (t(getErrorTranslationKey(getErrorType(mutationError)) as never) as string)
        : null;

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <h1 className={styles.title}>{t('login.title')}</h1>

            {errorMessage && (
                <div className={styles.errorBanner} role="alert">
                    {errorMessage}
                </div>
            )}

            <Input
                label={t('login.email')}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="name@example.com"
                autoComplete="email"
                required
            />

            <Input
                label={t('login.password')}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                placeholder="••••••••"
                autoComplete="current-password"
                required
            />

            <Button type="submit" loading={loading} className={styles.submitButton}>
                {t('login.submit')}
            </Button>
        </form>
    );
};

export default LoginForm;
