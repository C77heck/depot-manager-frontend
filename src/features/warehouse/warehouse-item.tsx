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
    let sent = data?.histories?.map(history => history?.type === 'sent' ? 1 : 0).reduce((a, b) => a + b, 0) || 0;
    let arrived = data?.histories?.map(history => history?.type === 'arrived' ? 1 : 0).reduce((a, b) => a + b, 0) || 0;

    data?.histories?.forEach(history => {
        if (history?.type === 'transferred') {
            if (history.from?._id === data._id) {
                sent++;
            } else {
                arrived++;
            }
        }
    });

    console.log({ sent, arrived });
    const chartData: number[] = [data.maximumCapacity, data.capacityUtilization, data.availableCapacity, arrived, sent];
    const labels: string[] = [trans('maximum.capacity'), trans('current.capacity'), trans('available.capacity'), trans('arrived'), trans('sent')];
    console.log(data);
    return <div className={'w-100 bgc-light-1 border-radius-px-4 box-shadow h-100 p-30'}>
        <div className={'row mb-19'}>
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
                labels={labels}
            />
        </div>
    </div>;
});
