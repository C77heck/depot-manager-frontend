import * as React from "react";
import { useAuthContext } from '../../contexts/auth.context';
import { useForm } from '../../hooks/form.hook';
import { Button } from '../shared-ui/buttons/button';

export const LoginForm = (props: any) => {
    const { login, logout, isLoggedIn } = useAuthContext();
    const { inputHandler, isFormValid, fields } = useForm({
        fields: {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
        },
        isFormValid: false
    });
    return <div>

        <Button title={'Register'} buttonStyle={'link'} onClick={props.onClick}/>
    </div>;
};
