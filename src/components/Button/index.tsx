/**
 * Polymorphic button component with loading state.
 * Optimized with React.memo to prevent unnecessary re-renders.
 */

import { memo, type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Visual variant of the button
     */
    variant?: 'primary' | 'secondary' | 'outline';
    /**
     * Loading state - shows spinner and disables button
     */
    loading?: boolean;
}

const Button = memo<ButtonProps>(
    ({ className, variant = 'primary', loading, disabled, children, ...props }) => {
        return (
            <button
                className={clsx(styles.button, styles[variant], className)}
                disabled={disabled || loading}
                aria-busy={loading}
                {...props}
            >
                {loading && <span className={styles.spinner} aria-hidden="true" />}
                <span className={clsx(loading && styles.loadingText)}>{children}</span>
            </button>
        );
    },
);

Button.displayName = 'Button';

export default Button;
