import { useEffect, useState } from 'react';
import { useClient } from '../../hooks/client.hook';
import { DepotItem } from './depot-item';

export interface Depot {
    _id: string;
    name: string;
    status: 'open' | 'temporary-closed' | 'permanently-closed';
    maximumCapacity: number;
    currentCapacity: number;
}

export const DepotList = () => {
    const { getResources, getDepots } = useClient();
    const [depots, setDepots] = useState<Depot[]>([]);

    useEffect(() => {
        (async () => getResources())();
        (async () => {
            const depots = await getDepots();

            setDepots(depots);
        })();
    }, []);

    return <div>
        {depots?.map(depot => <DepotItem data={depot} key={depot._id}/>)}
    </div>;
};
