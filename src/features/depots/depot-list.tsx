import { useEffect, useState } from 'react';
import { useResourceRefresherContext } from '../../contexts/resource-refresher.context';
import { useTranslateContext } from '../../contexts/translate.context';
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
    const [categories, setCategories] = useState<Depot[]>([]);
    const { trans } = useTranslateContext();
    const { refresh } = useResourceRefresherContext();

    useEffect(() => {
        console.log({ triggering: refresh });
        (async () => getResources())();
        (async () => setDepots(await getDepots()))();
    }, [refresh]);

    return <div className={'row mt-30'}>
        <div className={'col-24 center'}>
            <h1 className={'fs-50'}>{trans('depots')}</h1>
        </div>
        {depots?.map(depot => <div key={depot._id} className={'col-md-12 col-24 center'}><DepotItem data={depot}/></div>)}
    </div>;
};
