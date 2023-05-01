import * as React from 'react';
import { useEffect, useState } from 'react';
import { useResourceRefresherContext } from '../../../contexts/resource-refresher.context';
import { useTranslateContext } from '../../../contexts/translate.context';
import { useClient } from '../../../hooks/client.hook';
import { Hr } from '../../shared-ui/hr';
import { formatLongText } from '../action-buttons/option';

export interface ProductListProps {
    warehouseId: string;
}

export const ProductList = ({ warehouseId }: ProductListProps) => {
    const { trans } = useTranslateContext();
    const { getWarehouse, isLoading } = useClient();
    const [products, setProducts] = useState<any[]>([]);
    const { refresh } = useResourceRefresherContext();

    const getData = async () => {
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
            value.amount = prods[+key];

            return value;
        });

        setProducts(mergedProducts);
    };
    useEffect(() => {
        (async () => getData())();
    }, [refresh]);

    useEffect(() => {
        (async () => getData())();
    }, []);

    if (!products?.length) {
        return <div className={'bgc-light-1 border-radius-px-4 box-shadow h-100 p-16 mt-30 w-100 center mb-30'}>
            <h3 className={'color-dark-2 fs-15'}>{trans('empty.list')}</h3>
        </div>;
    }

    return <div className={'bgc-light-1 border-radius-px-4 box-shadow h-100 p-16 mt-30'}>
        <h2 className={'color-dark-2 fs-30 fw--700 mb-27'}>{trans('packages')}</h2>
        <div className={'row '}>
            {products?.map(data => <div className={'col-md-6 col-10 mr-9 mb-9'}>
                    <div className={'row product-card h-100 hover-scale'}>
                        <div className={'col-24'}>{formatLongText(data.title, 30)}</div>
                        <div className={'col-24 center py-10'}>
                            <img className={'product-image'} src={data.image} alt={'product image'}/>
                        </div>
                        <div className={'row center'}>
                            <div className={'col-17'}>
                                <Hr className={'my-10'}/>
                            </div>
                        </div>
                        <div className={'col-24 pb-4 center'}>
                            <span className={'fs-14 fw--700'}>{data.amount}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>;
};
