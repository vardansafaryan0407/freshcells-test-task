import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from './index';

describe('Input', () => {
    it('renders label correctly', () => {
        render(<Input label="Email" id="email" />);
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('renders error message', () => {
        render(<Input label="Email" error="Invalid email" />);
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('handles change event', () => {
        const handleChange = vi.fn();
        render(<Input label="Email" onChange={handleChange} />);
        const input = screen.getByLabelText('Email');
        fireEvent.change(input, { target: { value: 'test@example.com' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('forwards ref', () => {
        const ref = { current: null };
        render(<Input label="Email" ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});
