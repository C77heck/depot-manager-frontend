import React from 'react';
import { Depot } from './depot-list';
import './depot.scss';

export const DepotItem = React.memo(({ data }: { depot: Depot }) => {
    console.log(data);
    return <div className={'depot-box'}>
        {data?.name}
        {data?.status}
        {data?.maximumCapacity}
        {data?.currentCapacity}
    </div>;
});
