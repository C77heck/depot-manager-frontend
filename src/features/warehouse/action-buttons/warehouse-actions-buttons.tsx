import * as React from 'react';
import { useTranslateContext } from '../../../contexts/translate.context';
import { useClient } from '../../../hooks/client.hook';
import { Button } from '../../shared-ui/buttons/button';
import { Warehouse } from '../warehouse-list';
import { ChangeStatus } from './change-status';
import { GetPackages } from './get-packages';
import { SendPackages } from './send.packages';
import { TransferPackages } from './transfer-packages';

export interface WarehouseActionsButtonsProps {
    data: Warehouse;
}

export const WarehouseActionsButtons = ({ data }: WarehouseActionsButtonsProps) => {
    const { trans } = useTranslateContext();
    const { createRandomProductGet } = useClient();

    const handleRandomAdd = async () => {
        const randomAmount = Array.from({ length: Math.floor(Math.random() * 10) });

        return Promise.all(randomAmount.map(round => createRandomProductGet(data?._id || '')));
    };

    return <div className={'row center'}>
        <div className={'col-md-4 col-24 px-25 pb-20  mt-30 center'}>
            <Button onClick={handleRandomAdd} className={'w-100'} buttonStyle={'action'}>
                <span className={'color-light-1 fs-14'}>{trans('random.add')}</span>
            </Button>
        </div>
        <div className={'col-md-4 col-24 px-25 pb-20  mt-30 center'}>
            <GetPackages
                disabled={data.status === 'permanently-closed'}
                warehouseId={data?._id || ''}
            />
        </div>
        <div className={'col-md-4 col-24 px-25 pb-20  mt-30 center'}>
            <SendPackages
                disabled={data.status === 'permanently-closed'}
                warehouseId={data?._id || ''}
            />
        </div>
        <div className={'col-md-4 col-24 px-25 pb-20  mt-30 center'}>
            <TransferPackages
                disabled={data.status === 'permanently-closed'}
                warehouseId={data?._id || ''}
            />
        </div>
        <div className={'col-md-4 col-24 px-25 pb-20  mt-30 center'}>
            <ChangeStatus
                disabled={data.status === 'permanently-closed'}
                warehouseId={data?._id || ''}
            />
        </div>
    </div>;
};
