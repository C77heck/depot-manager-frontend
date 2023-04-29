import * as React from 'react';
import { useEffect, useState } from 'react';
import { useResourceRefresherContext } from '../../contexts/resource-refresher.context';
import { useTranslateContext } from '../../contexts/translate.context';
import { useDebounce } from '../../hooks/debounce.hook';
import { Modal } from '../shared-ui/modal/modal';
import { CreateDepotForm } from './forms/create-depot.form';

export const CreateNewDepot = () => {
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
        content={<CreateDepotForm onSuccess={handleOnSuccess}/>}
        size={{ sm: 90, md: 72, lg: 40, xl: 30 }}
        header={<h2 className={'fs-30 text-align-center'}>{trans('new.depot')}</h2>}
        trigger={<button
            className={'center nav-bar-item bgc-primary-2 hover-scale'}
        >
            <span className={'color-light-1'}>{trans('new.depot')}</span>
        </button>}
    />;
};
