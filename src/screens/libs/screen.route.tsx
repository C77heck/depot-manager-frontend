import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthHandler } from '../../features/authentication/auth.handler';
import { NavBar } from '../../features/navigation/navbar';

export interface ScreenRouteProps extends ScreenProps {
    children: any;
}

export interface ScreenProps {
    route: string;
    auth?: boolean;
}

export const ScreenRoute = (props: ScreenRouteProps) => {
    const [ready, setReady] = useState(true);
    console.log({ router: props.route });
    return <Routes>
        <Route
            path={props.route}
            element={!ready
                ? <div className={'screen-view center'}>
                    <div className={'w-20'}>
                        {/*<Spinner onComplete={() => setReady(true)}/>*/}
                    </div>
                </div>
                : <div className={'screen-view p-20 pt-170'}>
                    <NavBar/>
                    {props.auth ? <AuthHandler>{props.children}</AuthHandler> : props.children}
                </div>}/>
    </Routes>;
};
