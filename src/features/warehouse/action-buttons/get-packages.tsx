import * as React from 'react';
import { useEffect, useState } from 'react';
import { useResourceRefresherContext } from '../../../contexts/resource-refresher.context';
import { useTranslateContext } from '../../../contexts/translate.context';
import { useDebounce } from '../../../hooks/debounce.hook';
import { Button } from '../../shared-ui/buttons/button';
import { Modal } from '../../shared-ui/modal/modal';
import { PackageOptions } from './package-options';

export const GetPackages = ({ warehouseId }: { warehouseId: string }) => {
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
        content={<PackageOptions onSuccess={handleOnSuccess} warehouseId={warehouseId}/>}
        size={{ sm: 90, md: 72, lg: 40, xl: 30 }}
        header={<h2 className={'fs-30 text-align-center'}>{trans('new.warehouse')}</h2>}
        trigger={<Button className={'w-70'} buttonStyle={'action'}>
            <span className={'color-light-1 fs-14'}>{trans('get.packages')}</span>
        </Button>}
    />;
};
