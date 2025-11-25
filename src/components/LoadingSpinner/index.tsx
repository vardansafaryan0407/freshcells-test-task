/**
 * Reusable loading spinner component with consistent styling.
 * Follows accessibility best practices with proper ARIA attributes.
 */

import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface LoadingSpinnerProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Size variant of the spinner
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Accessible label for screen readers
     */
    label?: string;
}

export const LoadingSpinner = ({
    size = 'md',
    label = 'Loading',
    className,
    ...props
}: LoadingSpinnerProps) => {
    return (
        <div
            className={clsx(styles.spinner, styles[size], className)}
            role="status"
            aria-label={label}
            {...props}
        >
            <span className={styles.visuallyHidden}>{label}</span>
        </div>
    );
};
