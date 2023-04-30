import React from 'react';
import { useTranslateContext } from '../../contexts/translate.context';
import { Warehouse } from './warehouse-list';

export const Status = ({ status }: { status?: Warehouse['status'] }) => {
    const { trans } = useTranslateContext();

    switch (status) {
        case 'open':
            return <div className={'status-wrapper--green'}>
                <span>{trans('open')}</span>
            </div>;
        case 'temporary-closed':
            return <div className={'status-wrapper--orange'}>
                <span>{trans('temp.closed')}</span>
            </div>;
        case 'permanently-closed':
            return <div className={'status-wrapper--red'}>
                <span>{trans('perm.closed')}</span>
            </div>;
        default:
            return null;
    }
};
