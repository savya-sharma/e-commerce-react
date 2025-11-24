import { useAuth } from '../contexts/AuthProvider'
import { Navigate } from 'react-router-dom';

const ProctectedRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <h1 className="text-white text-2xl">Loading...</h1>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isLoggedIn) {
        return <Navigate to='/login' />
    }

    return children;
}

export default ProctectedRoute
