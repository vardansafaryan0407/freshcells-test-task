/**
 * Accessible input component with label and error handling.
 * Optimized with React.memo and forwardRef for form libraries.
 */

import { memo, forwardRef, useId, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * Input label text
     */
    label?: string;
    /**
     * Error message to display
     */
    error?: string;
}

const Input = memo(
    forwardRef<HTMLInputElement, InputProps>(({ className, label, error, id, ...props }, ref) => {
        const generatedId = useId();
        const inputId = id || generatedId;
        const errorId = `${inputId}-error`;

        return (
            <div className={styles.container}>
                {label && (
                    <label htmlFor={inputId} className={styles.label}>
                        {label}
                    </label>
                )}
                <input
                    id={inputId}
                    ref={ref}
                    className={clsx(styles.input, error && styles.errorInput, className)}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    {...props}
                />
                {error && (
                    <span id={errorId} className={styles.errorMessage} role="alert">
                        {error}
                    </span>
                )}
            </div>
        );
    }),
);

Input.displayName = 'Input';

export default Input;
