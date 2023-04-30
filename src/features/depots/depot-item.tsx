import React from 'react';
import { useTranslateContext } from '../../contexts/translate.context';
import { Chart } from './chart';
import { Depot } from './depot-list';
import './depot.scss';

export const DepotItem = React.memo(({ data }: { depot: Depot }) => {
    const { trans } = useTranslateContext();
    const chartData: number[] = [data.currentCapacity, data.maximumCapacity, data.availableCapacity];

    return <div className={'depot-box'}>
        <Chart
            title={trans('state')}
            colorIndex={0}
            chartName={'Bar'}
            data={chartData}
            labels={[trans('current.capacity'), trans('maximum.capacity'), trans('available.capacity')]}
        />
        {data?.name}
        {data?.status}
        {data?.maximumCapacity}
        {data?.currentCapacity}
    </div>;
});
