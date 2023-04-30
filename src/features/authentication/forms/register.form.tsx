import * as React from 'react';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext, UserRegistrationProps } from '../../../contexts/auth.context';
import { useTranslateContext } from '../../../contexts/translate.context';
import { useForm } from '../../../hooks/form.hook';
import { Button } from '../../shared-ui/buttons/button';
import { Input } from '../../shared-ui/inputs/input';
import { emailValidator } from '../../shared-ui/inputs/validators/email.validator';
import { comparePassword } from '../../shared-ui/inputs/validators/password-confirmation.validator';
import { passwordValidator } from '../../shared-ui/inputs/validators/password.validator';
import { requiredValidator } from '../../shared-ui/inputs/validators/required.validator';

export interface FormProps {
    onSuccess: () => void;
    onClick: () => void;
}

export const RegisterForm = (props: FormProps) => {
    const { register, isLoading, error } = useAuthContext();
    const { trans } = useTranslateContext();
    const [validate, setValidate] = useState(false);
    const { inputHandler, payload, isFormValid, fields } = useForm({
        fields: {
            firstName: {
                value: '',
                isValid: false
            },
            lastName: {
                value: '',
                isValid: false
            },
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
            passwordAgain: {
                value: '',
                isValid: false
            },
        },
        isFormValid: false
    });

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!isFormValid) {
                return setValidate(!validate);
            }

            await register(payload as UserRegistrationProps);
            toast(trans('success'), { type: 'success' });
            props.onSuccess();
        } catch (e) {
            toast(e, { type: 'success' });
        }
    };

    return <div>
        <form onSubmit={(e) => handleLogin(e)}>
            <div className={'mb-30 center flex-column'}>
                <div className={'max-width-30 w-100'}>
                    <Input
                        validate={validate}
                        inputHandler={inputHandler}
                        value={fields.firstName.value}
                        name={'firstName'}
                        validators={[requiredValidator]}
                        label={trans('first.name')}
                    />
                </div>
                <div className={'max-width-30 w-100'}>
                    <Input
                        validate={validate}
                        inputHandler={inputHandler}
                        value={fields.lastName.value}
                        name={'lastName'}
                        validators={[requiredValidator]}
                        label={trans('last.name')}
                    />
                </div>
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
                        validators={[passwordValidator]}
                        label={trans('password')}
                    />
                </div>
                <div className={'max-width-30 w-100'}>
                    <Input
                        validate={validate}
                        inputHandler={inputHandler}
                        value={fields.passwordAgain.value}
                        name={'passwordAgain'}
                        type={'password'}
                        validators={[comparePassword(fields.password.value)]}
                        label={trans('password.again')}
                    />
                </div>
            </div>
            <div className={'w-100 center'}>
                <div className={'max-width-30 w-100'}>
                    <Button isLoading={isLoading} type={'submit'} buttonStyle={'submit'} title={trans('register')}/>
                </div>
            </div>
        </form>
        <div className={'w-100 center pt-10'}>
            <Button buttonStyle={'link'} onClick={props.onClick}>
                <span className={'color-dark-2'}>{trans('login')}</span>
            </Button>
        </div>
    </div>;
};
