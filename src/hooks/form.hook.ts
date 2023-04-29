import { useCallback, useEffect, useState } from 'react';

export interface FormOptions {
    fields: Record<string, { value: string, isValid: boolean }>;
    isFormValid: boolean;
}

export interface InputHandlerOptions {
    inputKey: string,
    value: string,
    isValid: boolean
}

export const useForm = (options: FormOptions) => {
    const [fields, setFields] = useState<FormOptions['fields']>(options.fields);
    const [payload, setPayload] = useState<object>(null);
    const [isFormValid, setIsFormValid] = useState<boolean>(!!options.isFormValid);

    useEffect(() => {
        setIsFormValid(() => {
            for (const key of Object.keys(fields)) {
                if (!fields[key].isValid) {
                    return false;
                }
            }

            return true;
        });

        setPayload(() => {
            const data: object = {};
            for (const key of Object.keys(fields)) {
                data[key] = fields[key]?.value || '';
            }

            return data;
        });
    }, [fields]);

    const inputHandler = useCallback(({ inputKey, value, isValid }: InputHandlerOptions) => {
        setFields(prev => ({
            ...prev,
            [inputKey]: { value, isValid }
        }));
    }, []);

    return { inputHandler, payload, isFormValid, fields };
};
