import { ChangeEvent, useState } from 'react';
import { InputHandlerOptions } from '../../../hooks/form.hook';
import { InputWrapper } from './input-wrapper';

export interface InputProps {
    inputHandler: ({ inputKey, value, isValid }: InputHandlerOptions) => void;
    value: string;
    name: string;
    className?: string;
    placeholder?: string;
    type?: 'text' | 'password';
}

export const Input = (props: InputProps) => {
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInFocus, setIsInFocus] = useState(false);
    const [type, setType] = useState(props?.type || 'text');
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.inputHandler({ isValid, inputKey: props.name, value: e.target?.value || '' });
    };
    // css classes to manage...

    return <InputWrapper hasError={!isValid} errorMessage={errorMessage} isInFocus={isInFocus}>

        <div className={'input-wrapper'}>
            <input
                onFocus={() => setIsInFocus(true)}
                onBlur={() => setIsInFocus(false)}
                onChange={handleOnChange}
                value={props.value}
                className={`input ${props?.className || ''}`}
                placeholder={props?.placeholder || ''}
                type={type}
            />
            {props.type === 'password' && <Eyeicon
                onClick={() => setType(type === 'text' ? 'password' : 'text')}
                width={25}
                className={`hover-opacity pt-3 pr-4 ${this.state.type === 'text' ? 'color--secondary-1' : ''}`}
            />}
        </div>
    </InputWrapper>;
};
