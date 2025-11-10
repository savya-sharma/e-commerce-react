import { useAuth } from '../contexts/AuthProvider'
import { Navigate } from 'react-router-dom';

const ProctectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    console.log("isLogined", isLoggedIn);

    if (isLoggedIn === null) {
        return <h1>Loading...</h1>
    }

    if (isLoggedIn === false) {
        return <Navigate to='/login' />
    }

    return (
        children
    )
}

export default ProctectedRoute
