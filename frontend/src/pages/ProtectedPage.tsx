import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedPageProps {
    children: ReactNode;
}

export const ProtectedPage = ({ children }: ProtectedPageProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        // console.log("Retrieved token:", token);

        if (token) {
            setIsAuthenticated(true);
        }

        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    return <>{children}</>;
};
