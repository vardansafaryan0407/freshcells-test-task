/**
 * Route guard for public pages (like login).
 * Redirects to account page if user is already authenticated.
 */

import { Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../constants';

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={ROUTES.ACCOUNT} replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;
