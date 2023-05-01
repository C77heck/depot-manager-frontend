import React from 'react';
import { useTranslateContext } from '../../contexts/translate.context';
import { Warehouse } from './warehouse-list';

export const Status = ({ data, capacity }: { data?: Warehouse | undefined }) => {
    const { trans } = useTranslateContext();

    if (!data) {
        return null;
    }

    const renderCapacityTag = () => {
        if (capacity === 0) {
            return <div className={'status-wrapper--yellow'}>
                <span>{trans('empty')}</span>
            </div>;
        }

        if (capacity === data.maximumCapacity) {
            return <div className={'status-wrapper--red'}>
                <span>{trans('full')}</span>
            </div>;
        }

        return null;
    };

    const renderStatusTag = () => {
        switch (data.status) {
            case 'open':
                return <div className={'status-wrapper--green'}>
                    <span>{trans('open')}</span>
                </div>;
            case 'temporary-closed':
                return <div className={'status-wrapper--orange'}>
                    <span>{trans('temp.closed')}</span>
                </div>;
            case 'permanently-closed':
                return <div className={'status-wrapper--grey'}>
                    <span>{trans('perm.closed')}</span>
                </div>;
            default:
                return null;
        }
    };

    return <div className={'display-flex justify-content-end'}>
        {renderCapacityTag()}
        {renderStatusTag()}
    </div>;
};
