import React, { useEffect, useState } from 'react';
import { useClient } from '../../../hooks/client.hook';
import { WarehouseActionsButtons } from '../action-buttons/warehouse-actions-buttons';
import { History, ProductHistoryList } from '../product-history/product-history-list';
import { Warehouse } from '../warehouse-list';
import { WarehouseDetails } from './warehouse-details';

export interface IWarehouseDetails {
    histories: History[];
    warehouse: Warehouse;
    capacityUtilization: number;
}

export const WarehouseView = ({ id }: { id: string }) => {
    const { getWarehouse } = useClient();
    const [data, setData] = useState<IWarehouseDetails>(null);

    useEffect(() => {
        (async () => {
            const results = await getWarehouse({ id });

            setData(results);
        })();
    }, []);

    return <div>
        <div className={'row'}>
            <div className={'col-24 mb-50'}>
                <WarehouseActionsButtons data={data?.warehouse}/>
            </div>
            <div className={'col-md-12 col-24 px-30 my-15'}>
                <WarehouseDetails data={data?.warehouse}/>
            </div>
            <div className={'col-md-12 col-24 px-30 my-15'}>
                <ProductHistoryList histories={data?.histories || []}/>
            </div>
        </div>
    </div>;
};
