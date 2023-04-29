import * as React from 'react';
import { FormEvent, useState } from 'react';
import { useAuthContext, UserProps } from '../../../contexts/auth.context';
import { useTranslateContext } from '../../../contexts/translate.context';
import { useForm } from '../../../hooks/form.hook';
import { Button } from '../../shared-ui/buttons/button';
import { Input } from '../../shared-ui/inputs/input';
import { emailValidator } from '../../shared-ui/inputs/validators/email.validator';
import { requiredValidator } from '../../shared-ui/inputs/validators/required.validator';
import { FormProps } from './register.form';

export const LoginForm = (props: FormProps) => {
    const { login, error, isLoading } = useAuthContext();
    const { trans } = useTranslateContext();
    const [validate, setValidate] = useState(false);
    const { inputHandler, payload, isFormValid, fields } = useForm({
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

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid) {
            return setValidate(!validate);
        }

        await login(payload as UserProps);

        props.onSuccess();
    };

    return <div>
        <form onSubmit={(e) => handleLogin(e)}>
            <div className={'mb-30 center flex-column'}>
                <div className={'max-width-30 w-100'}>
                    <Input
                        validate={validate}
                        inputHandler={inputHandler}
                        value={fields.email.value}
                        name={'email'}
                        validators={[emailValidator]}
                        placeholder={'example@gmail.com'}
                        label={trans('email')}
                    />
                </div>
                <div className={'max-width-30 w-100'}>
                    <Input
                        validate={validate}
                        inputHandler={inputHandler}
                        value={fields.password.value}
                        name={'password'}
                        type={'password'}
                        validators={[requiredValidator]}
                        label={trans('password')}
                    />
                </div>
            </div>
            <div className={'w-100 center'}>
                <div className={'max-width-30 w-100'}>
                    <Button isLoading={isLoading} type={'submit'} buttonStyle={'submit'} title={trans('login')}/>
                </div>
            </div>
        </form>
        <div className={'w-100 center pt-10'}>
            <Button buttonStyle={'link'} onClick={props.onClick}>
                <span className={'color-dark-2'}>{trans('register')}</span>
            </Button>
        </div>
    </div>;
};
