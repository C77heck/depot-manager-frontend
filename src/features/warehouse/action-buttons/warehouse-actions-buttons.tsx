import { Warehouse } from '../warehouse-list';
import { ChangeStatus } from './change-status';
import { GetPackages } from './get-packages';
import { SendPackages } from './send.packages';
import { TransferPackages } from './transfer-packages';

export interface WarehouseActionsButtonsProps {
    data: Warehouse;
}

export const WarehouseActionsButtons = ({ data }: WarehouseActionsButtonsProps) => {
    return <div className={'row center'}>
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
