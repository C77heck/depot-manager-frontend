import * as React from 'react';
import { useEffect, useState } from 'react';
import { useResourceRefresherContext } from '../../contexts/resource-refresher.context';
import { useTranslateContext } from '../../contexts/translate.context';
import { useDebounce } from '../../hooks/debounce.hook';
import { AddIcon } from '../shared-ui/icons/icons';
import { Modal } from '../shared-ui/modal/modal';
import { CreateWarehouseForm } from './forms/create-warehouse.form';

export const CreateNewWarehouse = () => {
    const { trans } = useTranslateContext();
    const [show, setShow] = useState(true);
    const debounce = useDebounce(() => setShow(true), 1000);
    const { triggerRefresh } = useResourceRefresherContext();

    useEffect(() => {
        if (!show) {
            debounce.trigger();
        }
    }, [show]);

    const handleOnSuccess = () => {
        triggerRefresh();
        setShow(false);
    };

    return <Modal
        show={show}
        className={'border-radius-px-5 p-15'}
        content={<CreateWarehouseForm onSuccess={handleOnSuccess}/>}
        size={{ sm: 100, md: 72, lg: 40, xl: 30 }}
        header={<h2 className={'fs-30 text-align-center'}>{trans('new.warehouse')}</h2>}
        trigger={<button className={'center nav-bar-item bgc-primary-1 hover-scale'}>
            <AddIcon className={'color-light-1'} width={24}/>
        </button>}
    />;
};
