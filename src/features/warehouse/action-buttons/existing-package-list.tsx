import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslateContext } from '../../../contexts/translate.context';
import { useClient } from '../../../hooks/client.hook';
import { Button } from '../../shared-ui/buttons/button';
import { SpinnerIcon } from '../../shared-ui/icons/icons';
import { Product } from '../product-history/product-history-list';
import { Option } from './option';

export interface PackageOptionsProps {
    onSuccess: () => void;
    warehouseId: string;
}

export interface ExistingProduct extends Product {
    limit: 0;
}

export const ExistingPackageList = ({ onSuccess, warehouseId }: PackageOptionsProps) => {
    const { trans } = useTranslateContext();
    const { isLoading, sendProducts, getWarehouse } = useClient();
    const [cart, setCart] = useState({});
    const [products, setProducts] = useState<ExistingProduct[]>([]);

    useEffect(() => {
        (async () => {
            const warehouse = await getWarehouse({ id: warehouseId });

            const warehouseProducts = warehouse?.products;
            const prods = {};
            const uniqueProducts = {};
            for (const prod of warehouseProducts) {
                prods[prod.productId] = !prods[prod.productId] ? 1 : prods[prod.productId] + 1;
                uniqueProducts[prod.productId] = prod;
            }

            const mergedProducts = Object.keys(uniqueProducts).map(key => {
                const value = uniqueProducts[+key];
                value.limit = prods[+key];

                return value;
            });

            setProducts(mergedProducts);
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

    if (isLoading) {
        return <div className={'w-100 center'}>
            <SpinnerIcon className={'py-40'} width={45}/>
        </div>;
    }

    if (!products?.length) {
        return <div className={'w-100 center'}>
            <h3 className={'color-dark-2 fs-15'}>{trans('empty.list')}</h3>
        </div>;
    }

    const handleSubmit = async () => {
        try {
            await sendProducts({ cart });
            toast(trans('success'), { type: 'success' });
            onSuccess();
        } catch (e) {
            toast(trans(e), { type: 'error' });
        }
    };

    return <div className={'scrollable'}>
        <div className={'row mb-30'}>
            {products?.map(product => <div
                    className={'col-md-8 col-12 p-10'}
                    key={product?._id}
                >
                    <Option
                        limit={product.limit}
                        cart={cart}
                        onAdd={(id) => handleOnAdd(id)}
                        onRemove={(id) => handleOnRemove(id)}
                        data={product}
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
