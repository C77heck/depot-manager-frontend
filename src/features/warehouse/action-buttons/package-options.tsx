import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslateContext } from '../../../contexts/translate.context';
import { ProductCreateOptions, useClient } from '../../../hooks/client.hook';
import { Button } from '../../shared-ui/buttons/button';
import { Product } from '../product-history/product-history-list';
import { Option } from './option';

export interface PackageOptionsProps {
    onSuccess: () => void;
    warehouseId?: string;
}

export const PackageOptions = ({ onSuccess, warehouseId }: PackageOptionsProps) => {
    const { trans } = useTranslateContext();
    const { getResources, isLoading, createProduct } = useClient();
    const [cart, setCart] = useState({});
    const [options, setOptions] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            const response = await getResources();

            setOptions(response?.resources);
        })();
    }, []);

    const handleOnAdd = (id: string) => {
        setCart(prev => {
            const item = cart?.[id];

            if (!item) {
                return { ...cart, [id]: 1 };
            }

            return { ...cart, [id]: item + 1 };
        });
    };

    const handleOnRemove = (id: string) => {
        setCart(prev => {
            const item = cart?.[id];

            if (!item) {
                return cart;
            }

            return { ...cart, [id]: item - 1 };
        });
    };

    if (!options?.length) {
        return <div className={'w-100 center'}>
            <h3 className={'color-dark-2 fs-15'}>{trans('empty.list')}</h3>
        </div>;
    }

    const handleSubmit = async () => {
        try {
            await createProduct({ warehouseId, options: cart } as ProductCreateOptions);
            toast(trans('success'), { type: 'success' });
            onSuccess();
        } catch (e) {
            toast(trans(e), { type: 'error' });
        }
    };

    return <div className={'scrollable'}>
        <div className={'row mb-30'}>
            {options?.map(option => <div
                    className={'col-md-8 col-12 p-10'}
                    key={option?._id}
                >
                    <Option
                        cart={cart}
                        onAdd={(id) => handleOnAdd(id)}
                        onRemove={(id) => handleOnRemove(id)}
                        data={option}
                    />
                </div>
            )}
        </div>
        <div className={'w-100 center pb-30'}>
            <div className={'max-width-30 w-100'}>
                <Button
                    isLoading={isLoading}
                    onClick={handleSubmit}
                    buttonStyle={'submit'}
                    title={trans('submit')}
                />
            </div>
        </div>
    </div>;
};
