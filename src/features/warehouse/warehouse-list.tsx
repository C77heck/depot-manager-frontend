import { useEffect, useState } from 'react';
import { useResourceRefresherContext } from '../../contexts/resource-refresher.context';
import { useTranslateContext } from '../../contexts/translate.context';
import { useClient } from '../../hooks/client.hook';
import { History } from './product-history/product-history-list';
import { WarehouseItem } from './warehouse-item';

export interface Warehouse {
    _id: string;
    name: string;
    status: 'open' | 'temporary-closed' | 'permanently-closed' | undefined;
    maximumCapacity: number;
    capacityUtilization: number;
    availableCapacity: number;
    histories: History[];
}

export const WarehouseList = () => {
    const { getResources, getWarehouses } = useClient();
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const { trans } = useTranslateContext();
    const { refresh } = useResourceRefresherContext();

    useEffect(() => {
        (async () => getResources())();
        (async () => {
            const data = await getWarehouses();

            setWarehouses(data);
        })();
    }, [refresh]);

    return <div className={'row'}>
        <div className={'col-24 center'}>
            <h1 className={'fs-50 mb-34'}>{trans('warehouses')}</h1>
        </div>
        {warehouses?.map(warehouse => <div key={warehouse._id} className={'col-md-12 col-24 center mb-80 px-60'}>
            <WarehouseItem data={warehouse}/>
        </div>)}
    </div>;
};
