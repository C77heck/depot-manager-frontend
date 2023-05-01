import React, { useEffect, useState } from 'react';
import { useResourceRefresherContext } from '../../../contexts/resource-refresher.context';
import { useClient } from '../../../hooks/client.hook';
import { WarehouseActionsButtons } from '../action-buttons/warehouse-actions-buttons';
import { History, ProductHistoryList } from '../product-history/product-history-list';
import { Warehouse } from '../warehouse-list';
import { ProductList } from './product-list';
import { WarehouseDetails } from './warehouse-details';

export interface IWarehouseDetails {
    histories: History[];
    warehouse: Warehouse;
    capacityUtilization: number;
}

export const WarehouseView = ({ id }: { id: string }) => {
    const { getWarehouse } = useClient();
    const [data, setData] = useState<IWarehouseDetails>(null);
    const { refresh } = useResourceRefresherContext();

    useEffect(() => {
        (async () => {
            const results = await getWarehouse({ id });

            setData(results);
        })();
    }, [refresh]);

    if (!data) {
        return null;
    }

    return <div className={''}>
        <div className={'row'}>
            <div className={'col-24 mb-50'}>
                <WarehouseActionsButtons data={data.warehouse}/>
            </div>

            <div className={'col-md-12 col-24 px-md-30 my-15 height-fit-content row'}>
                <div className={'col-24'}>
                    <WarehouseDetails data={data?.warehouse} capacity={data?.capacityUtilization}/>
                </div>
                <div className={'col-24 mb-30'}>
                    <ProductList warehouseId={data?.warehouse?._id || ''}/>
                </div>
            </div>
            <div className={'col-md-12 col-24 px-md-30 my-15'}>
                <ProductHistoryList histories={data?.histories || []}/>
            </div>
        </div>
    </div>;
};
