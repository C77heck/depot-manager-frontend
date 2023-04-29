import * as React from 'react';
import { useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Constants } from '../../libs/constants';
import { LoginButton } from '../authentication/login.button';
import { LangPicker } from '../lang-picker/lang-picker';
import { HomeIcon } from '../shared-ui/icons/icons';
import { Portal } from '../shared-ui/portal';
import './navbar.scss';

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
            <div className={'col-8 center'}>
                <NavLink className={getColor(home.link)} to={home.link}>
                    <button className={'center nav-bar-item bgc-primary-1 hover-scale'}>
                        <HomeIcon width={29} className={'color-light-1'}/>
                    </button>
                </NavLink>
            </div>
            <div className={'col-8 center'}>
                <LangPicker/>
            </div>
            <div className={'col-8 center'}>
                <LoginButton/>
            </div>
        </nav>
    </Portal>;
};
