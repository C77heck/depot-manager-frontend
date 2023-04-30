import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthHandler } from '../../features/authentication/auth.handler';
import { NavBar } from '../../features/navigation/navbar';
import { Spinner } from '../../features/shared-ui/spinner/spinner';

export interface ScreenRouteProps extends ScreenProps {
    children: any;
}

export interface ScreenProps {
    route: string;
    auth?: boolean;
}

export const ScreenRoute = (props: ScreenRouteProps) => {
    const [ready, setReady] = useState(true);

    return <Routes>
        <Route
            path={props.route}
            element={!ready
                ? <div className={'screen-view center'}>
                    <div className={'w-20'}>
                        <Spinner onComplete={() => setReady(true)}/>
                    </div>
                </div>
                : <div className={'screen-view p-20 pt-170 display-flex justify-content-center'}>
                    <ToastContainer style={{ fontSize: 17 }}/>
                    <NavBar/>
                    <div className={'base-layout-width'}>
                        {props.auth ? <AuthHandler>{props.children}</AuthHandler> : props.children}
                    </div>
                </div>}/>
    </Routes>;
};
