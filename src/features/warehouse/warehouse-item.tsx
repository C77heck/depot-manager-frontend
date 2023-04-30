import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslateContext } from '../../contexts/translate.context';
import { ViewDetailsIcon } from '../shared-ui/icons/icons';
import { Chart } from './chart';
import { Status } from './status';
import { Warehouse } from './warehouse-list';
import './warehouse.scss';

export const WarehouseItem = React.memo(({ data }: { data: Warehouse }) => {
    const { trans } = useTranslateContext();
    const chartData: number[] = [data.capacityUtilization, data.maximumCapacity, data.availableCapacity];

    return <div className={'warehouse-box'}>
        <div className={'row mb-7'}>
            <div className={'col-18 display-flex justify-content-start'}>
                <Status data={data} capacity={data.capacityUtilization}/>
            </div>
            <div className={'col-6 display-flex justify-content-end'}>
                <div className={'bgc-primary-2 p-6 border-radius-px-4 hover-opacity'}>
                    <Link to={`/warehouse/${data._id}`}>
                        <ViewDetailsIcon className={'color-light-1'} width={18}/>
                    </Link>
                </div>
            </div>
        </div>
        <div className={'row mb-7'}>
            <div className={'col-12'}>
                <span className={'fw--700 fs-15'}>{trans('warehouse.name')}:</span>
            </div>
            <div className={'col-12 display-flex justify-content-end'}>
                <span className={'fs-15'}>{data?.name || '-'}</span>
            </div>
        </div>
        <div className={'row mb-7'}>
            <div className={'col-12'}>
                <span className={'fw--700 fs-15'}>{trans('maximum.capacity')}:</span>
            </div>
            <div className={'col-12 display-flex justify-content-end'}>
                <span className={'fs-15'}>{data?.maximumCapacity || '-'}</span>
            </div>
        </div>
        <div className={'row mb-7'}>
            <div className={'col-12'}>
                <span className={'fw--700 fs-15'}>{trans('current.capacity')}:</span>
            </div>
            <div className={'col-12 display-flex justify-content-end'}>
                <span className={'fs-15'}>{data?.capacityUtilization || 0}</span>
            </div>
        </div>
        <div className={'chart-box'}>
            <Chart
                doNotDisplayLegend={true}
                colorIndex={1}
                chartName={'Bar'}
                data={chartData}
                labels={[trans('current.capacity'), trans('maximum.capacity'), trans('available.capacity')]}
            />
        </div>
    </div>;
});
