import { useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Constants } from '../../libs/constants';
import { Portal } from '../shared-ui/portal';
import './navbar.scss';
import { LoginButton } from '../authentication/login.button';

export const NavBar = (props: any) => {
    const { home } = Constants.routes;
    const { pathname } = useLocation();

    const getColor = useCallback((link: string) => {
        const genericClasses = 'text-decoration-none uppercase fs-mlg-17 fs-14 white-space-nowrap py-20 fw--700';

        return pathname === link
            ? `${genericClasses} active-link`
            : `${genericClasses}`;
    }, []);

    return <Portal elementId={'navbar'}>
        <nav className={'nav-bar center row'}>
            <div className={'col-md-18 display-flex justify-content-space-between'}>
                <NavLink className={getColor(home.link)} to={home.link}>
                    {home.title}
                </NavLink>
            </div>
            <div className={'col-md-6 display-flex justify-content-space-between'}>
                <LoginButton/>
            </div>
        </nav>
    </Portal>;
};
