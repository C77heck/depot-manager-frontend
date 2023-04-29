import * as React from 'react';
import { useState } from 'react';
import { useAuthContext } from '../../contexts/auth.context';
import { useTranslateContext } from '../../contexts/translate.context';
import { LoginIcon, LogoutIcon } from '../shared-ui/icons/icons';
import { Modal } from '../shared-ui/modal/modal';
import { LoginForm } from "./login.form";
import { RegisterForm } from "./register.form";

export const LoginButton = () => {
    const { logout, isLoggedIn } = useAuthContext();
    const [isRegister, setIsRegister] = useState(false);
    const { trans } = useTranslateContext();

    if (isLoggedIn) {
        return <button
            onClick={logout}
            className={'center login-button bgc-primary-1 hover-scale'}
        >
            <LogoutIcon className={'center color-primary-2'} width={25}/>
        </button>;
    }

    return <Modal
        level={2}
        className={'border-radius-px-5 p-15'}
        content={isRegister
            ? <RegisterForm onClick={() => setIsRegister(false)}/>
            : <LoginForm onClick={() => setIsRegister(true)}/>}
        size={{ sm: 90, md: 72, lg: 60, xl: 40 }}
        header={<h2 className={'fs-30 text-align-center'}>{trans(isRegister ? 'login' : 'register')}</h2>}
        trigger={<button className={'center login-button bgc-primary-1 hover-scale'}>
            <LoginIcon className={'center color-primary-2'} width={25}/>
        </button>}
    />;
};
