import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/auth.context';
import { useTranslateContext } from '../../contexts/translate.context';
import { useDebounce } from '../../hooks/debounce.hook';
import { LoginIcon, LogoutIcon, SpinnerIcon } from '../shared-ui/icons/icons';
import { Modal } from '../shared-ui/modal/modal';
import { LoginForm } from "./forms/login.form";
import { RegisterForm } from "./forms/register.form";

export const LoginButton = () => {
    const { logout, isLoggedIn, isReady } = useAuthContext();
    const [isRegister, setIsRegister] = useState(false);
    const [show, setShow] = useState(true);
    const { trans } = useTranslateContext();
    const debounce = useDebounce(() => setShow(true), 1000);

    useEffect(() => {
        if (!show) {
            debounce.trigger();
        }
    }, [show]);

    if (!isReady) {
        return <button className={'center nav-bar-item bgc-primary-1 hover-scale'}>
            <SpinnerIcon className={'center color-light-1'} width={25}/>
        </button>;
    }

    if (isLoggedIn) {
        return <button
            onClick={logout}
            className={'center nav-bar-item bgc-primary-1 hover-scale'}
        >
            <LogoutIcon className={'center color-primary-2'} width={28}/>
        </button>;
    }

    return <Modal
        show={show}
        className={'border-radius-px-5 p-15'}
        content={isRegister
            ? <RegisterForm onSuccess={() => setShow(false)} onClick={() => setIsRegister(false)}/>
            : <LoginForm onSuccess={() => setShow(false)} onClick={() => setIsRegister(true)}/>}
        size={{ sm: 100, md: 72, lg: 40, xl: 30 }}
        header={<h2 className={'fs-30 text-align-center'}>{trans(isRegister ? 'register' : 'login')}</h2>}
        trigger={<button className={'center nav-bar-item bgc-primary-1 hover-scale'}>
            <LoginIcon className={'center color-light-1'} width={25}/>
        </button>}
    />;
};
