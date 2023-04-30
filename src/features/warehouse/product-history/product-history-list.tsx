import { useTranslateContext } from '../../../contexts/translate.context';
import { Warehouse } from '../warehouse-list';
import { ProductHistory } from './product-history';

export interface Product {
    _id: string;
    status: 'in-store' | 'sent';
    productId: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface History {
    _id: string;
    createdAt: Date;
    type: 'arrived' | 'transferred' | 'sent';
    from?: Warehouse;
    to?: Warehouse;
    product: Product;
}

export interface ProductHistoryProps {
    histories: History[];
}

export const ProductHistoryList = ({ histories }: ProductHistoryProps) => {
    const { trans } = useTranslateContext();

    if (!histories?.length) {
        return <div className={'w-100 bgc-light-1 border-radius-px-4 box-shadow h-100 p-16'}>
            <h2 className={'color-dark-2 fs-30 fw--700 mb-27'}>{trans('history')}</h2>
            <h3 className={'color-dark-2 fs-15'}>{trans('empty.list')}</h3>
        </div>;
    }

    return <div className={'row bgc-light-1 border-radius-px-4 box-shadow h-100 p-16'}>
        <h2 className={'color-dark-2 fs-30 fw--700 mb-20'}>{trans('history')}</h2>

        {histories?.map(history => <ProductHistory key={history._id} data={history}/>)}
    </div>;
};
