import * as React from 'react';
import { FormEvent, useState } from 'react';
import { useTranslateContext } from '../../../contexts/translate.context';
import { CreateDepotOptions, useClient } from '../../../hooks/client.hook';
import { useForm } from '../../../hooks/form.hook';
import { FormProps } from '../../authentication/forms/register.form';
import { Button } from '../../shared-ui/buttons/button';
import { Input } from '../../shared-ui/inputs/input';
import { onlyNumberValidator } from '../../shared-ui/inputs/validators/only-number.validator';
import { requiredValidator } from '../../shared-ui/inputs/validators/required.validator';

export const CreateDepotForm = (props: FormProps) => {
    const { createDepot, error, isLoading } = useClient();
    const { trans } = useTranslateContext();
    const [validate, setValidate] = useState(false);
    const { inputHandler, payload, isFormValid, fields } = useForm({
        fields: {
            name: {
                value: '',
                isValid: false
            },
            maximumCapacity: {
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

        await createDepot(payload as CreateDepotOptions);

        props.onSuccess();
    };

    return <div>
        <form onSubmit={(e) => handleLogin(e)}>
            <div className={'mb-30 center flex-column'}>
                <div className={'max-width-30 w-100'}>
                    <Input
                        validate={validate}
                        inputHandler={inputHandler}
                        value={fields.name.value}
                        name={'name'}
                        validators={[requiredValidator]}
                        label={trans('depot.name')}
                    />
                </div>
                <div className={'max-width-30 w-100'}>
                    <Input
                        validate={validate}
                        inputHandler={inputHandler}
                        value={fields.maximumCapacity.value}
                        name={'maximumCapacity'}
                        validators={[requiredValidator, onlyNumberValidator]}
                        label={trans('maximum.capacity')}
                    />
                </div>
            </div>
            <div className={'w-100 center pb-30'}>
                <div className={'max-width-30 w-100'}>
                    <Button isLoading={isLoading} type={'submit'} buttonStyle={'submit'} title={trans('submit')}/>
                </div>
            </div>
        </form>
    </div>;
};
