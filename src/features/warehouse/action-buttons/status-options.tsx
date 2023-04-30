import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslateContext } from '../../../contexts/translate.context';
import { ChangeStatusOptions, useClient } from '../../../hooks/client.hook';
import { Button } from '../../shared-ui/buttons/button';
import { Warehouse } from '../warehouse-list';
import { AvailableWarehouses } from './available-warehouses';

export interface StatusOptionsProps {
    warehouseId: string;
    onSuccess: () => void;
}

export const StatusOptions = ({ warehouseId, onSuccess }: StatusOptionsProps) => {
    const { trans } = useTranslateContext();
    const { isLoading, changeWarehouseStatus, getWarehouse } = useClient();
    const [status, setStatus] = useState<Warehouse['status']>('open');
    const [isAvailable, setIsAvailable] = useState<boolean>(true);
    const [transferWarehouseId, setTransferWarehouseId] = useState<string>('');

    useEffect(() => {
        (async () => {
            const warehouse = await getWarehouse({ id: warehouseId });

            setIsAvailable(warehouse?.warehouse.status !== 'permanently-closed');
            setStatus(warehouse?.warehouse.status);
        })();
    }, []);

    const handleOnClick = async () => {
        try {
            await changeWarehouseStatus({ transferWarehouseId, statusType: status, id: warehouseId } as ChangeStatusOptions);

            toast(trans('success'), { type: 'success' });
            onSuccess();
        } catch (e) {
            toast(trans(e), { type: 'error' });
        }
    };

    if (!isAvailable) {
        return <div className={'w-100 center pb-30 pt-15'}>
            <h3 className={'color-dark-2 fs-15'}>{trans('temp.closed')}</h3>
        </div>;
    }

    return <div className={'row center pb-20'}>
        <div className={'col-18'}>
            <div className={'col-24 mb-20'}>
                <Button
                    onClick={() => setStatus('temporary-closed')}
                    buttonStyle={status === 'temporary-closed' ? 'full' : 'outline'}
                    title={trans('temp.closed')}
                />
            </div>
            <div className={'col-24 mb-20'}>
                <Button
                    onClick={() => setStatus('permanently-closed')}
                    buttonStyle={status === 'permanently-closed' ? 'full' : 'outline'}
                    title={trans('perm.closed')}
                />
            </div>
            <div className={'col-24 mb-20'}>
                <Button
                    onClick={() => setStatus('open')}
                    buttonStyle={status === 'open' ? 'full' : 'outline'}
                    title={trans('open')}
                />
            </div>

            <AvailableWarehouses
                onPick={(id) => setTransferWarehouseId(id)}
                onFinish={(isAvailable) => setIsAvailable(isAvailable)}
                currentWarehouseId={warehouseId}
            />

            <div className={'w-100 my-10 mt-40'}>
                <Button
                    onClick={handleOnClick}
                    isLoading={isLoading}
                    buttonStyle={'submit'}
                >
                    <span className={'fs-18 fw--700'}>{trans('login')}</span>
                </Button>
            </div>
        </div>
    </div>;
};
