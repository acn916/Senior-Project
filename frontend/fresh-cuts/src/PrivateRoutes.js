import {Outlet, Navigate} from 'react-router-dom';

const PrivateRoutes = () => {
    let auth = {'token': true} //replace true with false for private routing
    return(
        auth.token ? <Outlet/> : <Navigate to ="Login"/>
    )
}

export default PrivateRoutes;