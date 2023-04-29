import React from 'react';
import { Depot } from './depot-list';

export const DepotItem = React.memo(({ depot }: { depot: Depot }) => {
    return <div>
        {depot.name}
    </div>;
});
