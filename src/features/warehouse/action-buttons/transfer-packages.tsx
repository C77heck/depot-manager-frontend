import * as React from 'react';
import { useEffect, useState } from 'react';
import { useResourceRefresherContext } from '../../../contexts/resource-refresher.context';
import { useTranslateContext } from '../../../contexts/translate.context';
import { useDebounce } from '../../../hooks/debounce.hook';
import { Button } from '../../shared-ui/buttons/button';
import { Modal } from '../../shared-ui/modal/modal';
import { TransferPackageList } from './transfer-package-list';

export const TransferPackages = ({ warehouseId }: { warehouseId: string }) => {
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
        wrapperClass={'w-100'}
        show={show}
        className={'border-radius-px-5 p-15'}
        content={<TransferPackageList onSuccess={handleOnSuccess} warehouseId={warehouseId}/>}
        size={{ sm: 90, md: 72, lg: 40, xl: 30 }}
        header={<h2 className={'fs-30 text-align-center'}>{trans('transfer.packages')}</h2>}
        trigger={<Button className={'w-100'} buttonStyle={'action'}>
            <span className={'color-light-1 fs-14'}>{trans('transfer.packages')}</span>
        </Button>}
    />;
};