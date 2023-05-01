import * as React from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { delay, interval } from 'rxjs';
import { useClient } from '../../hooks/client.hook';
import { Constants } from '../../libs/constants';
import { LoginButton } from '../authentication/login.button';
import { LangPicker } from '../lang-picker/lang-picker';
import { HomeIcon } from '../shared-ui/icons/icons';
import { Portal } from '../shared-ui/portal';
import { CreateNewWarehouse } from '../warehouse/create-new-warehouse';
import './navbar.scss';

export const NavBar = (props: any) => {
    const { home } = Constants.routes;
    const { pathname } = useLocation();
    const isHome = pathname === '/';
    const sizeClass = isHome ? 'col-md-6 col-12 py-9' : 'col-md-8 col-12 py-9';
    const { createRandomProductSend } = useClient();

    useEffect(() => {
        const interval$ = interval(5000)
            .pipe(delay(Math.random() * 10000))
            .subscribe(async () => {
                console.log('got triggered');
                await createRandomProductSend();
            });

        return () => interval$.unsubscribe();
    }, []);

    return <Portal elementId={'navbar'}>
        <nav className={'nav-bar center row'}>
            <div className={`${sizeClass} center`}>
                <NavLink className={''} to={home.link}>
                    <button className={'center nav-bar-item bgc-primary-1 hover-scale'}>
                        <HomeIcon width={29} className={'color-light-1'}/>
                    </button>
                </NavLink>
            </div>
            {isHome && <div className={`${sizeClass} center`}>
                <CreateNewWarehouse/>
            </div>}
            <div className={`${sizeClass} center`}>
                <LangPicker/>
            </div>
            <div className={`${sizeClass} center`}>
                <LoginButton/>
            </div>
        </nav>
    </Portal>;
};
