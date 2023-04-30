import React from 'react';
import { useTranslateContext } from '../../../contexts/translate.context';
import { Status } from '../status';
import { Warehouse } from '../warehouse-list';

export const WarehouseDetails = ({ data }: { data?: Warehouse | undefined }) => {
    const { trans } = useTranslateContext();

    return <div className={'row bgc-light-1 border-radius-px-4 box-shadow h-100 p-16'}>
        <div className={'row'}>
            <div className={'col-12'}>
                <h2 className={'color-dark-2 fs-30 fw--700 mb-27'}>{trans('details')}</h2>
            </div>
            <div className={'col-12 display-flex justify-content-end align-items-start pt-10'}>
                <Status status={data?.status}/>
            </div>
        </div>
        <div className={'row mb-14'}>
            <div className={'col-12'}>
                <span className={'fw--700 fs-15'}>{trans('warehouse.name')}:</span>
            </div>
            <div className={'col-12 display-flex justify-content-end'}>
                <span className={'fs-15'}>{data?.name || '-'}</span>
            </div>
        </div>
        <div className={'row mb-14'}>
            <div className={'col-12'}>
                <span className={'fw--700 fs-15'}>{trans('maximum.capacity')}:</span>
            </div>
            <div className={'col-12 display-flex justify-content-end'}>
                <span className={'fs-15'}>{data?.maximumCapacity || '-'}</span>
            </div>
        </div>
        <div className={'row mb-14'}>
            <div className={'col-12'}>
                <span className={'fw--700 fs-15'}>{trans('current.capacity')}:</span>
            </div>
            <div className={'col-12 display-flex justify-content-end'}>
                <span className={'fs-15'}>{data?.capacityUtilization || 0}</span>
            </div>
        </div>
    </div>;
};
