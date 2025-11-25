/**
 * Custom hook for login form state and validation.
 * Separates form logic from presentation for better testability.
 */

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { isValidEmail, isRequired } from '../lib/validation';

interface FormState {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

interface UseLoginFormReturn {
    email: string;
    password: string;
    errors: FormErrors;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    validate: () => boolean;
    clearErrors: () => void;
}

/**
 * Hook for managing login form state and validation
 */
export const useLoginForm = (): UseLoginFormReturn => {
    const { t } = useTranslation('auth');
    const [formState, setFormState] = useState<FormState>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const setEmail = useCallback(
        (email: string) => {
            setFormState((prev) => ({ ...prev, email }));
            // Clear error when user starts typing
            if (errors.email) {
                setErrors((prev) => ({ ...prev, email: undefined }));
            }
        },
        [errors.email],
    );

    const setPassword = useCallback(
        (password: string) => {
            setFormState((prev) => ({ ...prev, password }));
            // Clear error when user starts typing
            if (errors.password) {
                setErrors((prev) => ({ ...prev, password: undefined }));
            }
        },
        [errors.password],
    );

    const validate = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        if (!isRequired(formState.email)) {
            newErrors.email = t('login.required');
        } else if (!isValidEmail(formState.email)) {
            newErrors.email = t('login.invalid_email');
        }

        if (!isRequired(formState.password)) {
            newErrors.password = t('login.required');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formState.email, formState.password, t]);

    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);

    return {
        email: formState.email,
        password: formState.password,
        errors,
        setEmail,
        setPassword,
        validate,
        clearErrors,
    };
};
