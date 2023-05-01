import { useEffect, useState } from 'react';
import { useClient } from '../../../hooks/client.hook';
import { Button } from '../../shared-ui/buttons/button';

export interface AvailableWarehousesProps {
    currentWarehouseId: string;
    onFinish?: (isAvailable: boolean) => void;
    onPick: (warehouseToTransferTo: string) => void;
}

export const AvailableWarehouses = ({ onFinish, onPick, currentWarehouseId }: AvailableWarehousesProps) => {
    const { getAvailableWarehouses } = useClient();
    const [warehouses, setWarehouses] = useState([]);
    const [active, setActive] = useState<string>('');

    useEffect(() => onPick(active), [active]);

    useEffect(() => {
        (async () => {
            const warehouses: any[] = await getAvailableWarehouses();

            const filteredWarehouses = warehouses.filter(warehouse => warehouse?._id !== currentWarehouseId);
            onFinish?.(!!filteredWarehouses?.length);
            setWarehouses(filteredWarehouses);
        })();
    }, []);

    if (!warehouses?.length) {
        return null;
    }

    return <div className={'w-100 display-flex'}>
        {warehouses.map(warehouse => <div key={warehouse.name} className={'width-fit-content m-5'}>
            <Button
                buttonStyle={warehouse._id === active ? 'full' : 'outline'}
                title={warehouse.name}
                onClick={() => setActive(warehouse._id)}
            >
                <span className={'fs-16 p-8'}>{warehouse.name}</span>
            </Button>
        </div>)}
    </div>;
};
