import { Outlet } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AccountContext } from './scenes/login/Account';
import Login from './scenes/login';

const PrivateRoutes = () => {
    const { getSession } = useContext(AccountContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const session = await getSession();
                setIsAuthenticated(!!session); // Set isAuthenticated based on session existence
            } catch (error) {
                setIsAuthenticated(false);
                console.error('Error checking authentication:', error);
            }
        };

        checkAuthentication();
    }, [getSession]);

    return (
        isAuthenticated ? <Outlet/> : <Login/>
    );
}

export default PrivateRoutes;
